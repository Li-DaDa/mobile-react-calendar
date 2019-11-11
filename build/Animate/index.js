"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./animate.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Animation =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Animation, _PureComponent);

  function Animation(props) {
    var _this;

    _classCallCheck(this, Animation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Animation).call(this, props));
    _this.state = {
      isInnerShow: false,
      animationClass: ''
    };
    return _this;
  }

  _createClass(Animation, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      var isShow = props.isShow;

      if (isShow) {
        this.show().then(function () {
          _this2.doShowAnimation();
        });
      } else {
        this.doFadeAnimation();
      }
    }
  }, {
    key: "handleAnimationEnd",
    value: function handleAnimationEnd() {
      var isFading = this.state.animationClass === this.className(this.props.leave);

      if (isFading) {
        this.hide();
      }
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.setState({
          isInnerShow: true
        }, function () {
          resolve();
        });
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.setState({
        isInnerShow: false
      });
    }
  }, {
    key: "doShowAnimation",
    value: function doShowAnimation() {
      this.setState({
        animationClass: this.className(this.props.enter)
      });
    }
  }, {
    key: "doFadeAnimation",
    value: function doFadeAnimation() {
      this.setState({
        animationClass: this.className(this.props.leave)
      });
    }
    /**
     * 获取className
     * @param {string} inner 'showing' | 'fading'
     */

  }, {
    key: "className",
    value: function className(inner) {
      return "".concat(inner);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      children = _react["default"].Children.only(children);
      var _this$state = this.state,
          isInnerShow = _this$state.isInnerShow,
          animationClass = _this$state.animationClass;

      var element = _objectSpread({}, children, {
        props: _objectSpread({}, children.props, {
          className: "".concat(children.props.className, " ").concat(animationClass),
          onAnimationEnd: this.handleAnimationEnd.bind(this)
        })
      });

      return isInnerShow && element;
    }
  }]);

  return Animation;
}(_react.PureComponent);

var _default = Animation;
exports["default"] = _default;