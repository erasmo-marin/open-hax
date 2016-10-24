var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var hbs = require('hbs');
var multer  = require('multer');
var uuid = require('node-uuid');
var upload = multer({ dest: './public/uploads' });
var helpers = require("./views/helpers");
var favicon = require('serve-favicon');

var routes = require('./routes/index');
var room = require('./routes/room');

//api
var usersApi = require('./routes/api/v1/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var keyMirror = require('keymirror');

EVENTS = keyMirror({
  PLAYER_JOINED: "playerJoined",
  PLAYER_LEFT: "playerLeft",
  MESSAGE_RECEIVED: "messageReceived",
  MESSAGE_SENT: "messageSent",
  STATE_UPDATE: "stateUpdate",
  TIMER_PAUSE: "timerPause",
  TIMER_SET: "timerSet",
  TIMER_START: "timerStart",
  TIMER_END: "timerEnd"
});


hbs.registerPartials(__dirname + '/views/partials');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: '41A9E1792DE3F', 
                 saveUninitialized: true,
                 resave: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.png'));

//socket.io middleware
app.use(function(req, res, next) {
  res.io = io;
  next();
});


app.use('/', routes);
app.use('/room', room);


//api
app.use('/api/users', usersApi);

//datasource
/*var Users = require('./DAO/users.js');
usersdb = new Users();
usersdb.firstRun();*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

io.sockets.on('connection', function (socket) {
  console.log("on socket connection");
  socket.nickname = uuid.v4();

  socket.on(EVENTS.MESSAGE_SENT , function (data) {
    console.log("on socket message sent");
    io.sockets.in(socket.room).emit(EVENTS.MESSAGE_RECEIVED, socket.nickname, data);
  });
});

module.exports = {app: app, server: server};
