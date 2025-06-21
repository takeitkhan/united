export function stripHtmlTags(html){
  if (!html) return '';

  // Decode HTML-encoded tags (like \u003C = <)
  const decoded = html
    .replace(/\\u003C/g, '<')
    .replace(/\\u003E/g, '>');

  // Strip all HTML tags
  const plainText = decoded.replace(/<[^>]+>/g, '');

  // Optionally clean extra spaces or entities
  return plainText
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}
