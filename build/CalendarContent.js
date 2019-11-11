"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _CalendarItem = _interopRequireDefault(require("./CalendarItem"));

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

var CalendarContent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CalendarContent, _React$Component);

  function CalendarContent(props) {
    var _this;

    _classCallCheck(this, CalendarContent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CalendarContent).call(this, props));

    _this.componentWillMount = function () {
      // 验证传入的时间大小
      _this.verificationSelectValue(); // 根据maxDate 和 minDate 计算显示的月份


      _this.getShowMonth();
    };

    _this.componentDidMount = function () {
      _this.refs.calendar.addEventListener("scroll", function (e) {// console.dir(e.srcElement.scrollTop)
      }); // 如果有默认日期，滚动到默认日期，没有则滚动到今日


      var tempTimer = setTimeout(function () {
        clearTimeout(tempTimer);

        _this.defaultScroll();
      }, 0);
    };

    _this.defaultScroll = function () {
      var _this$state = _this.state,
          minSelect = _this$state.minSelect,
          maxSelect = _this$state.maxSelect;

      if (minSelect) {
        _this.scrollToMonth(minSelect);
      } else if (maxSelect) {
        _this.scrollToMonth(maxSelect);
      } else {
        _this.scrollToMonth(new Date());
      }
    };

    _this.scrollToMonth = function (date) {
      // 获取当前月份在所有列表中的索引
      var showMonth = _this.state.showMonth;
      var year = date.getFullYear();
      var month = date.getMonth();
      var cur = new Date(year, month, 1);
      var index = 0;

      for (var i = 0; i < showMonth.length; i++) {
        if (cur.getTime() === showMonth[i].getTime()) {
          index = i;
          break;
        }
      } // 累计高度


      var height = 0;

      for (var _i = 0; _i < index; _i++) {
        height += document.getElementById('calendar_item_' + _i).offsetHeight;
      } // 容器滚动到指定值


      document.getElementsByClassName("calendar_date_wrap")[0].scrollTo(0, height);
    };

    _this.verificationSelectValue = function () {
      var _this$state2 = _this.state,
          minSelect = _this$state2.minSelect,
          maxSelect = _this$state2.maxSelect;

      if (minSelect === null && maxSelect === null) {} else if (minSelect > maxSelect) {
        var temp = minSelect;
        minSelect = maxSelect;
        maxSelect = temp;
      }

      _this.setState({
        maxSelect: maxSelect,
        minSelect: minSelect
      });
    };

    _this.getShowMonth = function () {
      // 默认显示最近一年
      var _this$state3 = _this.state,
          minDate = _this$state3.minDate,
          maxDate = _this$state3.maxDate;

      if (!minDate) {
        minDate = new Date(maxDate.getFullYear() - 1, maxDate.getMonth() + 1, maxDate.getDate() + 1);
      }

      var minYear = minDate.getFullYear();
      var minMonth = minDate.getMonth();
      var maxYear = maxDate.getFullYear();
      var maxMongth = maxDate.getMonth();
      var start = new Date(minYear, minMonth, 1);
      var end = new Date(maxYear, maxMongth, 2);
      var monthArr = [];

      while (start < end) {
        monthArr.push(start);
        minMonth++;
        start = new Date(minYear, minMonth, 1);
      }

      _this.setState({
        showMonth: monthArr,
        minDate: minDate
      });
    };

    _this.selectDate = function (date) {
      var _this$state4 = _this.state,
          minSelect = _this$state4.minSelect,
          maxSelect = _this$state4.maxSelect;

      if (minSelect && maxSelect) {
        if (minSelect === date) {
          minSelect = null;
        } else if (maxSelect === date) {
          maxSelect = null;
        } else {
          minSelect = date;
          maxSelect = null;
        }
      } else if (minSelect || maxSelect) {
        if (minSelect) {
          if (minSelect === date) {
            minSelect = null;
          } else {
            if (date > minSelect) {
              maxSelect = date;
            } else {
              maxSelect = minSelect;
              minSelect = date;
            }
          }
        } else {
          if (maxSelect === date) {
            maxSelect = null;
          } else {
            if (date < maxSelect) {
              minSelect = date;
            } else {
              minSelect = maxSelect;
              maxSelect = date;
            }
          }
        }
      } else {
        minSelect = date;
      }

      _this.setState({
        minSelect: minSelect,
        maxSelect: maxSelect
      });
    };

    _this.state = {
      maxDate: (0, _common.formatDate)(props.maxDate),
      minDate: (0, _common.formatDate)(props.minDate),
      maxSelect: (0, _common.formatDate)(props.end),
      minSelect: (0, _common.formatDate)(props.start),
      showMonth: [] // 要显示的月份

    };
    return _this;
  }

  _createClass(CalendarContent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state5 = this.state,
          maxDate = _this$state5.maxDate,
          minDate = _this$state5.minDate,
          maxSelect = _this$state5.maxSelect,
          minSelect = _this$state5.minSelect,
          showMonth = _this$state5.showMonth;
      var _this$props = this.props,
          _this$props$close = _this$props.close,
          close = _this$props$close === void 0 ? function () {} : _this$props$close,
          _this$props$result = _this$props.result,
          result = _this$props$result === void 0 ? function () {} : _this$props$result;
      return _react["default"].createElement("div", {
        className: "calendar_content calendar_flex calendar_flex_direction_cloumn"
      }, _react["default"].createElement("div", {
        className: "calendar_clearfix"
      }, _react["default"].createElement("span", {
        className: "calendar_close calendar_fl",
        onClick: function onClick() {
          result(minSelect, maxSelect);
          close();
        }
      }, "\u221A"), _react["default"].createElement("span", {
        className: "calendar_close calendar_fr",
        onClick: function onClick() {
          return close();
        }
      }, "X")), _react["default"].createElement("div", {
        className: "calendar_week_title calendar_row calendar_flex"
      }, _react["default"].createElement("div", {
        className: "calendar_flex_1 calendar_text_red"
      }, "\u65E5"), _react["default"].createElement("div", {
        className: "calendar_flex_1"
      }, "\u4E00"), _react["default"].createElement("div", {
        className: "calendar_flex_1"
      }, "\u4E8C"), _react["default"].createElement("div", {
        className: "calendar_flex_1"
      }, "\u4E09"), _react["default"].createElement("div", {
        className: "calendar_flex_1"
      }, "\u56DB"), _react["default"].createElement("div", {
        className: "calendar_flex_1"
      }, "\u4E94"), _react["default"].createElement("div", {
        className: "calendar_flex_1 calendar_text_red"
      }, "\u516D")), _react["default"].createElement("div", {
        className: "calendar_flex_1 calendar_date_wrap",
        ref: "calendar"
      }, showMonth.map(function (item, index) {
        return _react["default"].createElement(_CalendarItem["default"], {
          key: index,
          minSelect: minSelect,
          maxSelect: maxSelect,
          max: maxDate,
          min: minDate,
          date: item,
          selectDate: _this2.selectDate,
          id: "calendar_item_".concat(index)
        });
      })));
    }
  }]);

  return CalendarContent;
}(_react["default"].Component);

CalendarContent.defaultProps = {
  maxDate: new Date(),
  minDate: null,
  end: null,
  start: null
};
var _default = CalendarContent;
exports["default"] = _default;