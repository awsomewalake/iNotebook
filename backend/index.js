const connect_to_mongo = require('./db')
connect_to_mongo();
var cors = require('cors')
const express = require('express')
const app = express()
const port = 5000
//Middleware
app.use(cors());
app.use(express.json()) 



// Available Routes
// app.use("/api/notes", require('./routes/notes.js'))
app.use("/api/auth", require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))
// app.post("/api/auth/login",require('./routes/auth.js') )


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})