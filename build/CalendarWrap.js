"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

require("./Calendar.css");

var _Animate = _interopRequireDefault(require("./Animate"));

var _CalendarContent = _interopRequireDefault(require("./CalendarContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CalendarWrap =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CalendarWrap, _React$Component);

  function CalendarWrap() {
    _classCallCheck(this, CalendarWrap);

    return _possibleConstructorReturn(this, _getPrototypeOf(CalendarWrap).apply(this, arguments));
  }

  _createClass(CalendarWrap, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          isShow = _this$props.isShow,
          close = _this$props.close;
      return _react["default"].createElement("div", {
        className: "calendar_wrap ".concat(className || '')
      }, _react["default"].createElement(_Animate["default"], {
        isShow: isShow,
        enter: "fade_in",
        leave: "fade_out"
      }, _react["default"].createElement("div", {
        className: "calendar_cover",
        onClick: function onClick() {
          return close();
        }
      })), _react["default"].createElement(_Animate["default"], {
        isShow: isShow,
        enter: "slide_in",
        leave: "slide_out"
      }, _react["default"].createElement("div", {
        className: "calendar_content_wrap"
      }, _react["default"].createElement(_CalendarContent["default"], this.props))));
    }
  }]);

  return CalendarWrap;
}(_react["default"].Component);

var _default = CalendarWrap;
exports["default"] = _default;