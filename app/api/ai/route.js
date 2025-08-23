// app/api/ai/route.js
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function extractTextFromResponse(resp) {
    // Prefer the SDK helper
    if (typeof resp?.output_text === 'string' && resp.output_text.trim()) {
        return resp.output_text.trim();
    }
    // Robust fallback across variants
    try {
        const tryOutput = (node) => {
            if (!node) return "";
            if (typeof node === "string") return node;
            if (Array.isArray(node)) return node.map(tryOutput).join("\n");
            if (typeof node === "object") {
                if (typeof node.text === "string") return node.text;
                if (Array.isArray(node.content)) return node.content.map(tryOutput).join("\n");
                if (node.output_text) return String(node.output_text);
            }
            return "";
        };
        const collected = [
            tryOutput(resp?.output),
            tryOutput(resp?.choices),
            tryOutput(resp)
        ].filter(Boolean).join("\n").trim();
        return collected;
    } catch {
        return "";
    }
}

export async function POST(req) {
    try {
        const { messages = [], context = {} } = await req.json();

        // Compose a compact, deterministic system message
        const system = [
            "You are Guido, an on-page guide for THIS single page.",
            "Use the page context provided; do not invent sections that aren't present.",
            "",
            "Emit EXACT directives when appropriate:",
            "- For scrolling: SCROLL_TO: <section_id_or_phrase>",
            "- For on-site link navigation: NAVIGATE_TO: <link_text_or_href>",
            "- For index/table of contents: INDEX:",
            "",
            "Otherwise, reply in concise English, grounded in the context.",
            "If the user asks “what is this page about?” or “summarize”, provide a short overview and 4–7 bullet points referencing on-page headings.",
            "",
            `URL: ${context.url || ""}`,
            `Title: ${context.title || ""}`,
            `Headings: ${(context.headings || []).map(h => `${h.level}:${h.text}`).join(" | ")}`,
            `Sections IDs: ${(context.sections || []).map(s => s.id).join(", ")}`,
            `Interactive labels: ${(context.interactive || []).map(i => `${i.tag}:${i.text}`).join(" | ")}`,
            `Links: ${(context.links || []).map(l => l.text || l.href).join(", ")}`,
            "",
            "PAGE_TEXT:",
            (context.page_text || "").slice(0, 12000)
        ].join("\n");

        const resp = await client.responses.create({
            model: "gpt-5-nano",
            input: [{ role: "system", content: system }, ...messages],
            max_output_tokens: 500
            // no temperature
        });

        const content = extractTextFromResponse(resp) || "";
        return Response.json({ content });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: err?.message || "Server error" }), { status: 500 });
    }
}
