const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

//middleware
app.use(cors())
app.use(express.json());

//available routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/booking'));
app.use('/api/admin', require('./routes/admin'));


app.get('/', (req, res) => {
    res.send('Hello World!')
})





app.listen(port, () => {
    console.log(`Hotel-backend app listening on port http://localhost:${port}`)
})