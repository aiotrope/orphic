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
    var item, currentUser, newItem;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          item = req.body.item;
          _context.prev = 1;
          currentUser = req.user;
          newItem = new _todo.default({
            items: item,
            user: _mongoose.default.Types.ObjectId(currentUser.id)
          });
          _context.next = 6;
          return _todo.default.create(newItem);
        case 6:
          return _context.abrupt("return", res.status(200).send('ok'));
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          res.status(422).json({
            error: _context.t0.message
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 9]]);
  }));
  return function createTodo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var _default = {
  createTodo: createTodo
};
exports.default = _default;