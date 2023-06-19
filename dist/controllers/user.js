"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("../utils/config"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = _interopRequireDefault(require("../models/user"));
require('express-async-errors');
//import logger from '../utils/logger'

var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var _req$body, email, password, foundUser, saltRounds, passwordHash, newUser;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return _user.default.findOne({
            email: email
          });
        case 3:
          foundUser = _context.sent;
          if (!foundUser) {
            _context.next = 6;
            break;
          }
          throw Error('Email already in use.');
        case 6:
          //logger.debug(JSON.stringify(body, null, 2))
          saltRounds = 10;
          _context.next = 9;
          return _bcrypt.default.hash(password, saltRounds);
        case 9:
          passwordHash = _context.sent;
          newUser = new _user.default({
            email: email,
            passwordHash: passwordHash
          });
          _context.next = 13;
          return _user.default.create(newUser);
        case 13:
          return _context.abrupt("return", res.status(200).send('ok'));
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var signin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var _req$body2, email, password, user, correctPassword, payload, token;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 3;
          return _user.default.findOne({
            email: email
          });
        case 3:
          user = _context2.sent;
          correctPassword = user !== null ? _bcrypt.default.compare(password, user.passwordHash) : false;
          if (user && correctPassword) {
            _context2.next = 7;
            break;
          }
          throw Error('Invalid login credentials!');
        case 7:
          payload = {
            email: user.email,
            id: user.id
          };
          token = _jsonwebtoken.default.sign(payload, _config.default.secret, {
            expiresIn: '1h'
          });
          res.status(200).json({
            success: true,
            token: token
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var privateRoute = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var currentUser;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          try {
            //logger.debug(req.user)
            currentUser = req.user;
            res.status(200).json({
              email: currentUser.email
            });
          } catch (err) {
            res.status(422).json({
              error: err.message
            });
          }
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function privateRoute(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var _default = {
  signup: signup,
  signin: signin,
  privateRoute: privateRoute
};
exports.default = _default;