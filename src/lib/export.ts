import { Context, ExportFormat } from "./types";

export function exportContexts(contexts: Context[], format: ExportFormat): string {
  switch (format) {
    case "markdown":
      return toMarkdown(contexts);
    case "xml":
      return toXML(contexts);
    case "json":
      return JSON.stringify(contexts, null, 2);
    case "plain":
      return toPlain(contexts);
    default:
      return toMarkdown(contexts);
  }
}

function toMarkdown(contexts: Context[]): string {
  const grouped = groupByCategory(contexts);
  let out = "# My Context\n\n";
  for (const [cat, items] of Object.entries(grouped)) {
    out += `## ${cat}\n\n`;
    for (const ctx of items) {
      out += `### ${ctx.title}\n`;
      if (ctx.tags.length > 0) out += `*Tags: ${ctx.tags.join(", ")}*\n\n`;
      out += `${ctx.content}\n\n`;
    }
  }
  return out.trim();
}

function toXML(contexts: Context[]): string {
  let out = '<?xml version="1.0" encoding="UTF-8"?>\n<context>\n';
  for (const ctx of contexts) {
    out += `  <item id="${ctx.id}" category="${ctx.category}" priority="${ctx.priority}">\n`;
    out += `    <title>${escapeXml(ctx.title)}</title>\n`;
    out += `    <content>${escapeXml(ctx.content)}</content>\n`;
    if (ctx.tags.length > 0) {
      out += `    <tags>${ctx.tags.map((t) => `<tag>${escapeXml(t)}</tag>`).join("")}</tags>\n`;
    }
    out += `  </item>\n`;
  }
  out += "</context>";
  return out;
}

function toPlain(contexts: Context[]): string {
  return contexts
    .map((ctx) => `[${ctx.category}] ${ctx.title}\n${ctx.content}`)
    .join("\n\n---\n\n");
}

function groupByCategory(contexts: Context[]): Record<string, Context[]> {
  return contexts.reduce(
    (acc, ctx) => {
      if (!acc[ctx.category]) acc[ctx.category] = [];
      acc[ctx.category].push(ctx);
      return acc;
    },
    {} as Record<string, Context[]>
  );
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
