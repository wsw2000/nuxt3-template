import sha256 from 'crypto-js/sha256'

type Outline = { key?: string; title: string }
export type OutlineParsed = { outline: Outline[]; content: string }

const handler = (dom: HTMLElement): OutlineParsed => {
  const outline: Outline[] = []
  dom.querySelectorAll('h2').forEach(element => {
    let key = element.getAttribute('id') ?? undefined
    const title = element.textContent || ''
    if (!key && title) {
      key = 'outline-' + sha256(title).toString().substring(0, 8)
      element.setAttribute('id', key)
    }
    outline.push({ key, title })
  })
  return { outline, content: dom.innerHTML || '' }
}

const parseHtmlOutline = async (html?: string): Promise<OutlineParsed> => {
  if (!html || html === '<p></p>') return { outline: [], content: '' }

  try {
    if (process.server) {
      const JSDOM = await import('jsdom').then(m => m.JSDOM)
      const dom = new JSDOM(html)
      return handler(dom.window.document.body)
    } else {
      const dom = window.document.createElement('div')
      dom.innerHTML = html
      return handler(dom)
    }
  } catch (error) {
    return { outline: [], content: html }
  }
}

export default parseHtmlOutline
