"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _todo = _interopRequireDefault(require("../models/todo"));
require('express-async-errors');
var createTodo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var items, currentUser, currentUserTodos, str, newItem;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          items = req.body.items;
          currentUser = req.user;
          _context.next = 4;
          return _todo.default.findOne({
            user: currentUser.id
          });
        case 4:
          currentUserTodos = _context.sent;
          _context.prev = 5;
          str = JSON.stringify(items);
          if (currentUserTodos) {
            _context.next = 14;
            break;
          }
          newItem = new _todo.default({
            items: str,
            user: _mongoose.default.Types.ObjectId(currentUser.id)
          });
          _context.next = 11;
          return _todo.default.create(newItem);
        case 11:
          return _context.abrupt("return", res.status(200).send('ok'));
        case 14:
          currentUserTodos.items = currentUserTodos.items.concat(str);
          _context.next = 17;
          return currentUserTodos.save();
        case 17:
          return _context.abrupt("return", res.status(200).send('ok'));
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](5);
          res.status(422).json({
            error: _context.t0.message
          });
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 20]]);
  }));
  return function createTodo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var fetchAllTodos = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var allTodos;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _todo.default.find({}).populate('user', {
            email: 1
          });
        case 3:
          allTodos = _context2.sent;
          res.status(200).json(allTodos);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(422).json({
            error: _context2.t0.message
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function fetchAllTodos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var _default = {
  createTodo: createTodo,
  fetchAllTodos: fetchAllTodos
};
exports.default = _default;