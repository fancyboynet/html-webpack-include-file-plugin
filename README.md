# html-webpack-include-file-plugin
在[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)基础上增加引入文件内容功能，类似[fis](https://github.com/fex-team/fis3)的`<link rel="import">`

## install

```bash
$ npm i -D html-webpack-include-file-plugin
```

## config

```javascript
const HtmlWebpackIncludeFilePlugin = require('html-webpack-include-file-plugin')
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackIncludeFilePlugin()
]
```

## include js
```html
<link rel="include" href="node_modules/some.js">
```
output with `script` tag wrap
```html
<script>//js content</script>
```

## include css
```html
<link rel="include" href="node_modules/some.css">
```
output with `style` tag wrap
```html
<style>//css content</style>
```

## include others
```html
<link rel="include" href="node_modules/some.html">
```
output without any tag
```html
<div></div>
```

## important
Currently, the source path is relative to the `process.cwd()` only.

```javascript
let sourcePath = path.resolve(process.cwd(), inline[1])
```

