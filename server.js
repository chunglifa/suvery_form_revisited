const express = require("express");
const app = express();

var path = require("path");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));

const server = app.listen(1337);
const io = require('socket.io')(server);

var counter = 0;
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


//SESSION:
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

//VIEWS: 
app.get('/', function(req, res) {
 res.render("index");
})

//SOCKET
io.on('connection',function (socket) { //2
    socket.on('posting_form',function(data){
        console.log('received data');
        console.log(data);
        console.log(data.name);
        console.log(data.location);
        console.log(data.language);
        console.log(data.comment);
        data = {
            name: data.name,
            location: data.location,
            language: data.language,
            comment: data.comment
        }
        console.log('PRINT DATA AGAIN')
        console.log(data);
        var rand = Math.floor((Math.random() * 1000) + 1);
        socket.emit('updated_message', {data:data},rand);
    });

});


   


// tell the express app to listen on port 8000
// app.listen(1337, function() {
//  console.log("listening on port 8000");
// });
