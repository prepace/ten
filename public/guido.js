// public/guido.js
(() => {
    const API_ENDPOINT = '/api/ai';
    let isOpen = false;
    let conversationHistory = [];

    // ---------- Styles (flash + minor widget CSS) ----------
    function ensureGuidoStyles() {
        if (document.getElementById('guido-style')) return;
        const style = document.createElement('style');
        style.id = 'guido-style';
        style.textContent = `
      @keyframes guidoFlash {
        0% { background: rgba(255, 235, 59, 0); }
        25% { background: rgba(255, 235, 59, 0.40); }
        100% { background: rgba(255, 235, 59, 0); }
      }
      .guido-flash { position: relative; }
      .guido-flash::after {
        content: ""; position: absolute; inset: 0;
        pointer-events: none; border-radius: inherit;
        animation: guidoFlash 2s ease-out forwards;
      }
      #guido-hotbar button {
        background:none;border:0;cursor:pointer;padding:6px 10px;border-radius:8px;
      }
      #guido-hotbar button:hover { background:rgba(0,0,0,.05); }
      #guido-hotbar { position:sticky; top:0; z-index:1; background:#fff; border-bottom:1px solid #e9ecef; }
      #guido-messages a[data-guido-scroll] { text-decoration:underline; cursor:pointer; }
    `;
        document.head.appendChild(style);
    }
    function highlightElement(el) {
        if (!el) return;
        el.classList.add('guido-flash');
        setTimeout(() => el.classList.remove('guido-flash'), 2100);
    }

    // ---------- UI ----------
    function createChatWidget() {
        if (document.getElementById('guido-widget')) return;
        const html = `
<div id="guido-widget" style="position:fixed;bottom:20px;right:20px;z-index:10000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <button id="guido-toggle" aria-label="Open Guido" title="Open Guido" style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.15);transition:transform .2s ease;border:none">
    <span style="color:#fff;font-size:24px">🧭</span>
  </button>

  <div id="guido-window" role="dialog" aria-modal="true" aria-label="Guido — Site Guide" style="position:absolute;bottom:80px;right:0;width:360px;height:520px;background:#fff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.12);display:none;flex-direction:column;overflow:hidden">
    <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:16px;font-weight:600">
      🧭 Guido — Site Guide
      <div style="font-size:12px;opacity:.9;margin-top:4px">Try “show index”, “summarize”, “scroll to timeline”, “go to contact”, etc.</div>
    </div>

    <div id="guido-hotbar">
      <div style="display:flex;color:#333;gap:6px;align-items:center;padding:8px 10px">
        <button data-guido-action="index" title="Index">Index</button>
        <button data-guido-action="summarize" title="Summarize current section">Summarize</button>
        <div style="width:1px;height:20px;background:#e9ecef;margin:0 4px"></div>
        <button data-guido-action="top" title="Top">Top</button>
        <button data-guido-action="up" title="Previous section">↑</button>
        <button data-guido-action="down" title="Next section">↓</button>
        <button data-guido-action="bottom" title="Bottom">Bottom</button>
      </div>
    </div>

    <div id="guido-messages" style="flex:1;overflow-y:auto;padding:16px;background:#f8f9fa"></div>

    <div style="padding:16px;border-top:1px solid #e9ecef;background:#fff">
      <div style="display:flex;gap:8px">
        <input type="text" id="guido-input" placeholder="Ask Guido…" style="flex:1;color:#333;border:1px solid #dee2e6;border-radius:20px;padding:8px 16px;outline:none;font-size:14px" />
        <button id="guido-send" aria-label="Send" style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center">→</button>
      </div>
    </div>
  </div>
</div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    }

    // ---------- Utilities / Indexing ----------
    function slugify(text) {
        return (text || '')
            .toLowerCase().trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .slice(0, 60);
    }
    function ensureId(el, fallbackPrefix = 'el') {
        if (el.id) return el.id;
        const base = slugify(el.getAttribute('aria-label') || el.textContent || fallbackPrefix);
        let id = base || `${fallbackPrefix}`;
        if (!id) id = fallbackPrefix;
        let i = 1;
        while (document.getElementById(id)) id = `${base || fallbackPrefix}-${i++}`;
        el.id = id;
        return id;
    }

    // Headings for index + up/down
    function getHeadings(limit = 200) {
        return Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((h, i) => {
            const id = ensureId(h, `section-${i}`);
            return { id, level: h.tagName.toLowerCase(), text: (h.textContent || '').trim(), el: h };
        }).filter(h => h.text).slice(0, limit);
    }

    // Index: **headings only** (as requested)
    function renderIndex() {
        const rows = [];
        getHeadings().forEach(h => {
            const one = h.text.replace(/\s+/g, ' ').trim();
            const t = one.length > 80 ? one.slice(0, 80) + '…' : one;
            rows.push(`<li style="margin:6px 0"><a href="#${h.id}" data-guido-scroll="${h.id}">${t}</a></li>`);
        });
        const msg = rows.length
            ? `<div><strong>Page index</strong><ul style="padding-left:18px;margin:8px 0 0">${rows.join('')}</ul></div>`
            : `I couldn’t find any headings to index.`;
        addMessage(msg);
    }

    // Queryable content for AI and navigation (includes buttons/links/labels)
    function getInteractiveIndex(limit = 400) {
        const sel = [
            'button',
            '[role="button"]',
            'a[href]',
            'input[aria-label], textarea[aria-label], select[aria-label]',
            '[data-action]',
            '[data-testid]',
            '[aria-label]',
            '[id]'
        ].join(',');

        const all = Array.from(document.querySelectorAll(sel));
        const items = [];
        all.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            const isHidden = (el.offsetParent === null && el !== document.body) || (rect.width === 0 && rect.height === 0);
            if (isHidden) return;

            const label = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('alt') || el.getAttribute('title') || el.id || '').trim();
            if (!label) return;

            const id = ensureId(el, `el-${i}`);
            const oneLine = label.replace(/\s+/g, ' ').slice(0, 120);
            items.push({ id, text: oneLine, tag: el.tagName.toLowerCase(), el });
        });
        return items.slice(0, limit);
    }

    // Sections list (for context text)
    function getSections(limit = 80) {
        const out = [];
        document.querySelectorAll('main, section, article, [id]').forEach((el, i) => {
            if (el.closest('#guido-widget')) return; // skip widget
            const id = ensureId(el, `block-${i}`);
            const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
            if (id && text.length > 20) out.push({ id, text: text.slice(0, 600) }); // compact per-section text
        });
        return out.slice(0, limit);
    }

    function getLinks(limit = 120) {
        return Array.from(document.querySelectorAll('a[href]'))
            .map(a => ({ text: (a.textContent || '').trim(), href: a.getAttribute('href') || '' }))
            .filter(l => l.text || l.href)
            .slice(0, limit);
    }

    // **Full page text snapshot** (compact) for the API to reason over
    function getPageTextSnapshot(maxLen = 12000) {
        const clone = document.body.cloneNode(true);
        // remove noisy/irrelevant nodes
        clone.querySelectorAll('script,style,noscript,svg,canvas,video,audio,iframe,#guido-widget').forEach(n => n.remove());
        const txt = (clone.innerText || '').replace(/\s+/g, ' ').trim();
        return txt.slice(0, maxLen);
    }

    function getPageContext() {
        const headings = getHeadings();
        const interactive = getInteractiveIndex();
        return {
            url: location.href,
            title: document.title,
            headings: headings.map(({ level, id, text }) => ({ level, id, text })),
            sections: getSections(),
            links: getLinks(),
            interactive: interactive.map(({ id, text, tag }) => ({ id, text, tag })),
            page_text: getPageTextSnapshot()
        };
    }

    function getCurrentHeadingIndex() {
        const margin = 140;
        const hs = getHeadings();
        let current = 0;
        hs.forEach((h, idx) => {
            const top = h.el.getBoundingClientRect().top;
            if (top <= margin) current = idx;
        });
        return { index: current, list: hs };
    }

    function getCurrentSectionId() {
        const { index, list } = getCurrentHeadingIndex();
        return list[index]?.id || list[0]?.id || null;
    }

    function findTopHighlightTarget() {
        const h1 = document.querySelector('h1');
        if (h1) return h1;
        const main = document.querySelector('main');
        if (main) return main;
        return document.body;
    }

    // ---------- Messaging ----------
    function addMessage(content, isUser = false) {
        const wrap = document.getElementById('guido-messages');
        const div = document.createElement('div');
        div.style.cssText =
            `margin-bottom:12px;padding:12px;border-radius:12px;max-width:85%;word-wrap:break-word;` +
            (isUser
                ? 'background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;margin-left:auto'
                : 'background:#fff;color:#333;border:1px solid #e9ecef');
        div.innerHTML = content; // allow markup for action links
        wrap.appendChild(div);
        wrap.scrollTop = wrap.scrollHeight;
    }

    function sectionTitleById(id) {
        if (id === 'top') return 'top of the page';
        if (id === 'bottom') return 'bottom of the page';
        const el = document.getElementById(id);
        if (!el) return id;
        const h = el.matches?.('h1,h2,h3,h4,h5,h6') ? el : el.querySelector?.('h1,h2,h3,h4,h5,h6');
        const txt = (h?.textContent || el.getAttribute?.('aria-label') || el.id || '').trim();
        return txt || id;
    }

    // ---------- Navigation / Execution ----------
    function executeNavigation(command) {
        const cmdRaw = (command || '');
        const cmd = cmdRaw.toLowerCase();

        // Index requests
        if (/\b(index|table of contents|toc|list sections)\b/i.test(cmdRaw)) {
            renderIndex();
            return { ok: true, kind: 'index' };
        }

        // Top/Bottom
        if (/\b(top|beginning)\b/.test(cmd)) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => highlightElement(findTopHighlightTarget()), 220);
            addMessage(`Back at the top. Open the index to jump anywhere.`);
            return { ok: true, kind: 'scroll', id: 'top' };
        }
        if (/\b(bottom|end)\b/.test(cmd)) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            addMessage(`At the bottom. Want the index or a summary?`);
            return { ok: true, kind: 'scroll', id: 'bottom' };
        }

        // “summarize …” is handled by callers; we only navigate here.

        // Try direct heading/interactive/section match
        const cleaned = cmd.replace(/scroll to |go to |show (me )?|navigate to /gi, '').trim();
        if (cleaned) {
            const allTargets = [
                ...getHeadings().map(h => ({ id: h.id, text: h.text, el: h.el })),
                ...getInteractiveIndex().map(x => ({ id: x.id, text: x.text, el: x.el })),
                ...getSections().map(s => ({ id: s.id, text: s.text }))
            ];

            const target = allTargets.find(t =>
                (t.id && t.id.toLowerCase().includes(cleaned)) ||
                (t.text && t.text.toLowerCase().includes(cleaned))
            );

            if (target) {
                const el = document.getElementById(target.id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => highlightElement(el), 220);
                }
                addMessage(`Jumped to “${sectionTitleById(target.id)}”. Need a summary or jump elsewhere?`);
                return { ok: true, kind: 'scroll', id: target.id };
            }

            // Link navigation fallback
            for (const a of document.querySelectorAll('a[href]')) {
                const linkText = (a.textContent || '').toLowerCase();
                const href = (a.getAttribute('href') || '').toLowerCase();
                if (linkText.includes(cleaned) || href.includes(cleaned)) {
                    const text = (a.textContent || '').trim() || a.getAttribute('href') || '';
                    addMessage(`Opening “${text}”…`);
                    window.location.href = a.getAttribute('href');
                    return { ok: true, kind: 'navigate', text, href: a.getAttribute('href') || '' };
                }
            }
        }

        return { ok: false };
    }

    // ---------- Client fallback summarizer (if API returns empty) ----------
    function fallbackSummarizeById(id) {
        const el = document.getElementById(id);
        if (!el) return 'I couldn’t find that section to summarize.';
        // Collect visible text from the section
        const clone = el.cloneNode(true);
        clone.querySelectorAll('script,style,noscript,svg,canvas,video,audio,iframe,#guido-widget').forEach(n => n.remove());
        const raw = (clone.innerText || '').replace(/\s+/g, ' ').trim();
        if (!raw) return 'That section doesn’t contain readable text.';
        const words = raw.split(' ').slice(0, 180); // cap
        const short = words.join(' ');
        // Naive bullet extraction
        const bullets = short.split(/[.;]\s+/).slice(0, 5).map(s => s.trim()).filter(Boolean);
        return 'Here’s a quick summary:\n\n' + bullets.map(b => `• ${b}`).join('\n');
    }

    // ---------- AI ----------
    async function sendToAI(userText) {
        try {
            const context = getPageContext();
            const res = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    context,
                    messages: [
                        ...conversationHistory,
                        { role: 'user', content: userText }
                    ]
                })
            });

            if (!res.ok) { addMessage('Sorry, Guido is unavailable right now.'); return; }
            const data = await res.json();
            const aiText = (data && typeof data.content === 'string') ? data.content.trim() : '';

            if (!aiText) {
                // If we asked to summarize, try local fallback
                const sumMatch = userText.match(/summarize.*\(id:\s*([^)]+)\)/i);
                if (sumMatch) {
                    const id = sumMatch[1].trim();
                    addMessage(fallbackSummarizeById(id).replace(/\n/g, '<br/>'));
                    return;
                }
                addMessage(`I couldn’t generate a reply just now. Want the page index?`);
                return;
            }

            if (/^INDEX:/i.test(aiText)) {
                renderIndex();
                addMessage('Index ready. Click a heading to jump.');
            } else if (/SCROLL_TO:/i.test(aiText)) {
                const target = aiText.split(/SCROLL_TO:/i)[1].trim();
                const result = executeNavigation(`scroll to ${target}`);
                if (!result || !result.ok) addMessage(`Couldn’t locate “${target}”. Try the index.`);
            } else if (/NAVIGATE_TO:/i.test(aiText)) {
                const target = aiText.split(/NAVIGATE_TO:/i)[1].trim();
                const result = executeNavigation(`go to ${target}`);
                if (!result || !result.ok) addMessage(`Navigation didn’t work. Try another label or URL snippet.`);
            } else {
                addMessage(aiText.replace(/\n/g, '<br/>'));
            }

            conversationHistory.push({ role: 'user', content: userText }, { role: 'assistant', content: aiText });
            if (conversationHistory.length > 12) conversationHistory = conversationHistory.slice(-8);
        } catch (e) {
            console.error(e);
            addMessage('Error connecting to Guido. Please try again.');
        }
    }

    // ---------- Global click handlers (index links + hotbar) ----------
    document.addEventListener('click', (e) => {
        const t = e.target;
        if (!t || !t.getAttribute) return;

        // Index items
        if (t.matches('[data-guido-scroll]')) {
            e.preventDefault();
            const id = t.getAttribute('data-guido-scroll');
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => highlightElement(el), 220);
                addMessage(`Jumped to “${sectionTitleById(id)}”. Need anything else here?`);
            }
            return;
        }

        // Hotbar actions
        const action = t.getAttribute('data-guido-action');
        if (!action) return;
        e.preventDefault();

        if (action === 'index') { renderIndex(); return; }
        if (action === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => highlightElement(findTopHighlightTarget()), 220);
            addMessage(`Back at the top. Open the index to jump anywhere.`);
            return;
        }
        if (action === 'bottom') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            addMessage(`At the bottom of the page.`);
            return;
        }
        if (action === 'up' || action === 'down') {
            const { index, list } = getCurrentHeadingIndex();
            const nextIndex = action === 'up' ? Math.max(0, index - 1) : Math.min(list.length - 1, index + 1);
            const target = list[nextIndex];
            if (target && target.el) {
                target.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => highlightElement(target.el), 220);
                addMessage(`Jumped to “${target.text}”.`);
            }
            return;
        }
        if (action === 'summarize') {
            const id = getCurrentSectionId();
            const title = sectionTitleById(id);
            sendToAI(`Summarize the section "${title}" (id: ${id}). Keep it concise with bullet points grounded strictly in the provided page context.`);
            return;
        }
    });

    // ---------- Init ----------
    function initializeChat() {
        ensureGuidoStyles();

        const toggleEl = document.getElementById('guido-toggle');
        const chatWin = document.getElementById('guido-window');
        const inputEl = document.getElementById('guido-input');
        const sendBtn = document.getElementById('guido-send');

        const handleSummarizeCommand = (raw) => {
            const m = raw.match(/summarize(?:\s+(.*))?$/i);
            const tail = (m && m[1] || '').trim();
            if (!tail || /^(this|that|here|current|section)$/i.test(tail)) {
                const id = getCurrentSectionId();
                const title = sectionTitleById(id);
                sendToAI(`Summarize the section "${title}" (id: ${id}). Keep it concise with bullet points grounded strictly in the provided page context.`);
                return true;
            }
            if (/page|whole/i.test(tail)) {
                sendToAI('Summarize this page briefly using the provided context. Provide a short overview and a bulleted index of sections with one-line descriptions.');
                return true;
            }
            const res = executeNavigation(`scroll to ${tail}`);
            if (res && res.ok && res.kind === 'scroll') {
                const title = sectionTitleById(res.id);
                sendToAI(`Summarize the section "${title}" (id: ${res.id}). Keep it concise with bullet points grounded strictly in the provided page context.`);
                return true;
            }
            sendToAI(`Summarize "${tail}" as referenced on this page. If it’s a section, summarize that; otherwise summarize the most relevant on-page content.`);
            return true;
        };

        const sendMessage = () => {
            const text = (inputEl.value || '').trim();
            if (!text) return;
            addMessage(text, true);
            inputEl.value = '';

            if (/^\s*summarize(\b|$)/i.test(text)) {
                handleSummarizeCommand(text);
                return;
            }

            const result = executeNavigation(text);
            if (!result || !result.ok) {
                sendToAI(text);
            }
            // If navigation happened, we already showed a friendly English message.
        };

        toggleEl.addEventListener('click', () => {
            isOpen = !isOpen;
            chatWin.style.display = isOpen ? 'flex' : 'none';
            if (isOpen && conversationHistory.length === 0) {
                addMessage(`Hi, I’m <strong>Guido</strong>. Use the hotbar or ask me to “show index”, “summarize”, or “go to contact”.`);
            }
        });

        sendBtn.addEventListener('click', sendMessage);
        inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });

        toggleEl.addEventListener('mouseenter', () => { toggleEl.style.transform = 'scale(1.1)'; });
        toggleEl.addEventListener('mouseleave', () => { toggleEl.style.transform = 'scale(1)'; });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { createChatWidget(); initializeChat(); });
    } else {
        createChatWidget(); initializeChat();
    }
})();
