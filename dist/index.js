"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _config = _interopRequireDefault(require("./utils/config"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _passport = _interopRequireDefault(require("passport"));
var _db = _interopRequireDefault(require("./utils/db"));
var _middlewares = _interopRequireDefault(require("./utils/middlewares"));
var _logger = _interopRequireDefault(require("./utils/logger"));
var _passport2 = _interopRequireDefault(require("./utils/passport"));
var _user = _interopRequireDefault(require("./routes/user"));
var app = (0, _express.default)();
(0, _db.default)();
(0, _passport2.default)(_passport.default);
app.set('views', _path.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(_express.default.static(_path.default.join(__dirname, '../public')));
app.use(_passport.default.initialize());
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use(_middlewares.default.loggingMiddleware);
app.use('/api', _user.default);
app.use(_middlewares.default.endPoint404);
app.use(_middlewares.default.errorHandler);
app.listen(_config.default.port, function () {
  _logger.default.http("Server is running on port ".concat(_config.default.port));
});