"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("./config"));
var _passportJwt = require("passport-jwt");
var _user = _interopRequireDefault(require("../models/user"));
var options = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: _config.default.secret,
  passReqToCallback: true
};
var strategy = function strategy(passport) {
  passport.use(new _passportJwt.Strategy(options, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, payload, done) {
      var user;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user.default.findOne({
              email: payload.email
            });
          case 2:
            user = _context.sent;
            if (!user) {
              _context.next = 6;
              break;
            }
            req.user = user; // current user Obj
            return _context.abrupt("return", done(null, user));
          case 6:
            return _context.abrupt("return", done(null, false));
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }()));
};
var _default = strategy;
exports.default = _default;