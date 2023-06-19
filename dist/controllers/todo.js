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
    var items, currentUser, currentUserTodos, newItem;
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
          if (currentUserTodos) {
            _context.next = 13;
            break;
          }
          newItem = new _todo.default({
            items: [items],
            user: _mongoose.default.Types.ObjectId(currentUser.id)
          });
          _context.next = 10;
          return _todo.default.create(newItem);
        case 10:
          return _context.abrupt("return", res.status(200).send('ok'));
        case 13:
          currentUserTodos.items = currentUserTodos.items.concat(items);
          _context.next = 16;
          return currentUserTodos.save();
        case 16:
          return _context.abrupt("return", res.status(200).send('ok'));
        case 17:
          _context.next = 22;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](5);
          res.status(422).json({
            error: _context.t0.message
          });
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 19]]);
  }));
  return function createTodo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var updateTodo = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var items, id, updates, filter, updateUserTodo;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          items = req.body.items;
          id = req.params.id;
          updates = {
            items: items
          };
          _context2.prev = 3;
          filter = {
            user: id
          };
          _context2.next = 7;
          return _todo.default.findByIdAndUpdate(filter, updates, {
            new: false,
            upsert: true
          });
        case 7:
          updateUserTodo = _context2.sent;
          if (updateUserTodo) res.status(200).send('ok');
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](3);
          res.status(422).json({
            error: _context2.t0.message
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 11]]);
  }));
  return function updateTodo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var _default = {
  createTodo: createTodo,
  updateTodo: updateTodo
};
exports.default = _default;