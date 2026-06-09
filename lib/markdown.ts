function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function inlineMarkdown(text: string): string {
  let out = escapeHtml(text)
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/\*(.+?)\*/g, '<em>$1</em>')
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary-gold hover:underline" rel="noopener noreferrer">$1</a>'
  )
  return out
}

/** Lightweight markdown → HTML for blog MDX bodies (headings, lists, paragraphs, links). */
export function renderMarkdown(markdown: string): string {
  const lines = markdown.trim().split('\n')
  const parts: string[] = []
  let inList = false

  const closeList = () => {
    if (inList) {
      parts.push('</ul>')
      inList = false
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()

    if (line.startsWith('### ')) {
      closeList()
      parts.push(`<h3 class="text-xl font-serif font-bold text-primary-white mt-8 mb-3">${inlineMarkdown(line.slice(4))}</h3>`)
    } else if (line.startsWith('## ')) {
      closeList()
      parts.push(`<h2 class="text-2xl font-serif font-bold text-primary-white mt-10 mb-4">${inlineMarkdown(line.slice(3))}</h2>`)
    } else if (line.startsWith('# ')) {
      closeList()
      parts.push(`<h2 class="text-2xl font-serif font-bold text-primary-white mt-10 mb-4">${inlineMarkdown(line.slice(2))}</h2>`)
    } else if (line.startsWith('- ')) {
      if (!inList) {
        parts.push('<ul class="list-disc pl-6 space-y-2 my-4 text-secondary-muted">')
        inList = true
      }
      parts.push(`<li>${inlineMarkdown(line.slice(2))}</li>`)
    } else if (line.trim() === '') {
      closeList()
    } else {
      closeList()
      parts.push(`<p class="text-secondary-muted leading-relaxed mb-5">${inlineMarkdown(line)}</p>`)
    }
  }

  closeList()
  return parts.join('\n')
}
