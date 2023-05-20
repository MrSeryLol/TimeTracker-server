const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config();


const errorHandler = require('./src/middleware/ErrorHandlingMiddleware')
const router = require('./src/routes/index')


const app = express();
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use('/api', router)

//Обработка ошибок, последний Middleware
app.use(errorHandler)
// parse application/x-www-form-urlencoded
// parse application/json
// app.use(bodyParser.json());
// parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// // parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }))

// app.use(bodyParser.urlencoded({extended: true}));




  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })




