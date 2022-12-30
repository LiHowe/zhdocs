function htmlEscape (str: string) {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',

    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }
  const htmlEscapeRegexp = /[&<>'"]/g
  return str.replace(htmlEscapeRegexp, (char) => htmlEscapeMap[char])
}

export default (md: any): void => {
  const originFence = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (...args: any) => {
    const [tokens, idx] = args
    const { info: languageType, content } = tokens[idx]
    if (content && languageType.trim() === 'mermaid') {
      return `
      <h-mermaid
      code="${htmlEscape(content.trim())}"
      ></h-mermaid>
      `
    }
    return `${originFence(...args)}`
  }
}
