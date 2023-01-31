const connect_to_mongo = require('./db')
connect_to_mongo();
const express = require('express')
const app = express()
const port = 3000



// Available Routes
app.get("/api/auth", require('./routes/auth.js'))
// app.get("/api/notes", require('./routes/notes.js'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})