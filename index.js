const path = require('path')
const fs = require('fs')
function HtmlWebpackIncludeFilePlugin(options) {
  // Configure your plugin with options...
}
let regLink = /<link.+rel="include".*?>/ig
let regInline = /href="(.+?)"/i
function render(html){
  let newHtml = html.replace(regLink, function (match) {
    let inline = match.match(regInline)
    if (!inline) {
      return match
    }
    let sourcePath = path.resolve(process.cwd(), inline[1])
    return readContent(sourcePath)
  })
  return newHtml
}
function readContent(path){
  let content = fs.readFileSync(path, 'utf8')
  if(/\.js$/.test(path)){
    return `<script>${content}</script>`
  }
  if(/\.css$/.test(path)){
    return `<style>${content}</style>`
  }
  return content
}
HtmlWebpackIncludeFilePlugin.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap('HtmlWebpackIncludeFilePlugin', (compilation) => {
    compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
      'HtmlWebpackIncludeFilePlugin',
      (data, cb) => {
        data.html = render(data.html)
        cb(null, data)
      }
    )
  })
}

module.exports = HtmlWebpackIncludeFilePlugin