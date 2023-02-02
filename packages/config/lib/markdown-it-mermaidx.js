"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function htmlEscape(str) {
    const htmlEscapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
    };
    const htmlEscapeRegexp = /[&<>'"]/g;
    return str.replace(htmlEscapeRegexp, (char) => htmlEscapeMap[char]);
}
exports.default = (md) => {
    const originFence = md.renderer.rules.fence.bind(md.renderer.rules);
    md.renderer.rules.fence = (...args) => {
        const [tokens, idx] = args;
        const { info: languageType, content } = tokens[idx];
        if (content && languageType.trim() === 'mermaid') {
            return `
      <h-mermaid
      code="${htmlEscape(content.trim())}"
      ></h-mermaid>
      `;
        }
        return `${originFence(...args)}`;
    };
};
