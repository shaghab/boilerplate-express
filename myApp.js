var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//console.log("Hello World");

//app.get("/", (req, res) => { res.send('Hello Express') });

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
let absolutePath = __dirname + "/public"
app.use("/public", express.static(absolutePath));

let logger = (req) => {
  console.log(req.method, req.path, "-", req.ip);
}

absolutePath = __dirname + "/views/index.html";
app.get("/",
  (req, res) => {
    logger(req);
    res.sendFile(absolutePath)
  }
);

app.get("/json",
  (req, res) => {
    var response = "Hello json";
    logger(req);
    if (process.env.MESSAGE_STYLE === 'uppercase') {
      response = response.toUpperCase();
    }
    res.json({ "message": response })
  }
);

app.get("/now",
  (req, res, next) => {
    logger(req);
    req.time = new Date().toString();
    next()
  },
  (req, res) => {
    logger(req);
    res.json({ "time": req.time })
  }
);

app.get("/:word/echo",
  (req, res) => {
    res.json({ "echo": req.params["word"] })
  }
);

app.get("/name",
  (req, res) => {
    console.log(req.query);
    res.json({ "name": req.query["first"] + " " + req.query["last"] });
  }
);

app.post("/name",
  (req, res) => {
    //console.log(req)
    res.json({ "name": req.body.first + " " + req.body.last });
  }
);

module.exports = app;
