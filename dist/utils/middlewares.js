"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("./config"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _morgan = _interopRequireDefault(require("morgan"));
var _logger = _interopRequireDefault(require("./logger"));
var _user = _interopRequireDefault(require("../models/user"));
var tokenExtractor = function tokenExtractor(req, res, next) {
  var authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  } else {
    next((0, _httpErrors.default)(401));
  }
  next();
};
var userExtractor = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
    var token, decoded, currentUser;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          token = req.token;
          decoded = _jsonwebtoken.default.decode(token, _config.default.jwt_key);
          _context.next = 4;
          return _user.default.findById(decoded.id);
        case 4:
          currentUser = _context.sent;
          if (!currentUser || !token || !decoded) {
            next((0, _httpErrors.default)(401));
          } else if (currentUser || token || decoded) {
            req.currentUser = currentUser;
            req.name = currentUser.name;
            req.user = decoded;
          } else {
            next((0, _httpErrors.default)(401));
          }
          next();
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function userExtractor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var stream = {
  write: function write(message) {
    return _logger.default.http(message);
  }
};
var skip = function skip() {
  var env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};
var loggingMiddleware = (0, _morgan.default)(':method :url :status :res[content-length] - :response-time ms', {
  stream: stream,
  skip: skip
});
var validateAuthObject = function validateAuthObject(schema) {
  return /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res, next) {
      var resource;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            resource = req.body;
            _context2.prev = 1;
            _context2.next = 4;
            return schema.validate(resource);
          case 4:
            next();
            _context2.next = 11;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            _logger.default.error(_context2.t0);
            res.status(400).json({
              error: _context2.t0.errors.join(', ')
            });
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 7]]);
    }));
    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();
};
var endPoint404 = function endPoint404(req, res, next) {
  next((0, _httpErrors.default)(404));
};
var errorHandler = function errorHandler(error, req, res, next) {
  _logger.default.error(error.message);
  _logger.default.debug(error.errors);
  if (error.name === 'CastError') {
    return res.status(400).json({
      error: "".concat(error.name, ": invalid ").concat(error.path, " using ").concat(error.value)
    });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    });
  }
  if (error.name === 'NotFoundError') {
    return res.status(404).json({
      error: error.message
    });
  }
  if (error.name === 'MongoServerError') {
    return res.status(400).json({
      error: "duplicate username ".concat(req.body.username, " cannot be registered!")
    });
  }
  if (error.name === 'TypeError') {
    return res.status(400).json({
      error: error.message
    });
  }
  if (error.name === 'JsonWebTokenError' || error.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'unauthorize: token maybe incorrect or missing!'
    });
  }
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired!'
    });
  }
  if (error.message === 'Email already in use.') {
    return res.status(403).json({
      email: error.message
    });
  }
  if (error.message === 'Invalid login credentials!') {
    return res.status(401).json({
      error: error.message
    });
  }
  next(error);
};
var middlewares = {
  loggingMiddleware: loggingMiddleware,
  endPoint404: endPoint404,
  errorHandler: errorHandler,
  tokenExtractor: tokenExtractor,
  userExtractor: userExtractor,
  validateAuthObject: validateAuthObject
};
var _default = middlewares;
exports.default = _default;