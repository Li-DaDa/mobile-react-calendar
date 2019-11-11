"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = void 0;

var formatDate = function formatDate(date, format) {
  /* yyyy:年，mm:月，dd:日 hh:时，MM：分，ss：秒 */
  if (date === "" || date === null) {
    return null;
  } else if (date === undefined) {
    date = new Date();
  }

  if (typeof date === 'string') {
    date = new Date(date.replace(/\-/g, '/'));
  }

  if (!format) {
    if (date instanceof Date) {
      return date;
    } else {
      return null;
    }
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  var day = date.getDate();
  day = day < 10 ? '0' + day : day;
  var hours = date.getHours();
  hours = hours < 10 ? '0' + hours : hours;
  var minute = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  var second = date.getSeconds();
  second = second < 10 ? '0' + second : second;
  return format.replace(/yyyy/g, year).replace(/mm/g, month).replace(/dd/g, day).replace(/hh/g, hours).replace(/MM/g, minute).replace(/ss/g, second);
};

exports.formatDate = formatDate;