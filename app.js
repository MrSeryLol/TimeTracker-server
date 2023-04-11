import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/x-www-form-urlencoded
// parse application/json
// app.use(bodyParser.json());
// parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// // parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }))

// app.use(bodyParser.urlencoded({extended: true}));



app.get('/', (req, res) => {
    res.send('Hello World!' + req.params);
    console.log(req.body);
    //res.json({requestBody: req.body});
  })

app.post('/', (req, res) => {
    console.log(req.body);
    //res.json("Ok");
    res.send("1");
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })




