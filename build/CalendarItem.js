"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _common = require("./common");

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

var CalendarItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CalendarItem, _React$Component);

  function CalendarItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CalendarItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CalendarItem)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      items: [],
      year: '',
      month: ''
    };

    _this.componentDidMount = function () {
      _this.setMonthData(_this.props);
    };

    _this.setMonthData = function (props) {
      var max = props.max,
          min = props.min,
          date = props.date;
      var items = [];
      var year = date.getFullYear();
      var month = date.getMonth(); // 获取本月第一天是周几

      var startWeek = new Date(year, month, 1).getDay();

      for (var i = 0; i < startWeek; i++) {
        items.push({
          text: '',
          disabled: true,
          date: null,
          index: i
        });
      } // 获取本月总共天数


      var total = new Date(year, month + 1, 0).getDate();

      for (var _i = 0; _i < total; _i++) {
        var curDate = new Date(year, month, _i + 1);
        items.push({
          text: _i + 1,
          disabled: curDate < min || curDate > max,
          date: curDate,
          index: _i + startWeek
        });
      }

      _this.setState({
        items: items,
        year: year,
        month: month
      });
    };

    _this.clickDateHandler = function (date) {
      _this.props.selectDate(date);
    };

    return _this;
  }

  _createClass(CalendarItem, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          items = _this$state.items,
          year = _this$state.year,
          month = _this$state.month;
      var _this$props = this.props,
          minSelect = _this$props.minSelect,
          maxSelect = _this$props.maxSelect,
          id = _this$props.id;
      var maxTimes = maxSelect && maxSelect.getTime();
      var minTimes = minSelect && minSelect.getTime();
      var today = new Date((0, _common.formatDate)(new Date(), 'yyyy/mm/dd')).getTime();
      return _react["default"].createElement("div", {
        className: "calendar_item",
        id: id
      }, _react["default"].createElement("div", {
        className: "calendar_item_title_wrap"
      }, _react["default"].createElement("div", {
        className: "calendar_item_title"
      }, year, "\u5E74", month + 1 < 10 ? '0' + (month + 1) : month + 1, "\u6708")), _react["default"].createElement("div", {
        className: "calendar_row calendar_flex calendar_flex_wrap"
      }, items.map(function (item, index) {
        var isSelected = false;
        var itemTimes = item.date && item.date.getTime();

        if (item.date && minSelect && maxSelect) {
          if (itemTimes >= minTimes && itemTimes <= maxTimes) {
            isSelected = true;
          }
        }

        if (item.date && (minSelect && itemTimes === minTimes || maxSelect && maxTimes === itemTimes)) {
          isSelected = true;
        }

        return _react["default"].createElement("div", {
          key: index,
          className: "calendar_flex_1 calendar_date_item ".concat(isSelected && 'selected', " ").concat(item.disabled && 'calendar_disabled', " ").concat(today === itemTimes && 'calendar_today'),
          onClick: function onClick() {
            return !item.disabled && _this2.clickDateHandler(item.date);
          }
        }, item.text, today === itemTimes ? _react["default"].createElement("div", null, "\u4ECA\u5929") : '');
      })));
    }
  }]);

  return CalendarItem;
}(_react["default"].Component);

var _default = CalendarItem;
exports["default"] = _default;