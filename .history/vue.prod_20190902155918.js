const express = require('express')
// const rewrite = require('express-urlrewrite')

const app = express()

const path = require('path')

app.use(express.static(path.join(__dirname, 'dist')))
app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

const port = process.env.PORT || 9999
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
