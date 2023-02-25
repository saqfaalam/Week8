const express = require('express')
const app = express()
const port = 3000;
const router = require("./query.js")

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})