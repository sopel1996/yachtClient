"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var onResponce = function onResponce(res) {
  return res.ok ? res.json() : Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 : ".concat(res.status));
};

var Api =
/*#__PURE__*/
function () {
  function Api(_ref) {
    var url = _ref.url,
        token = _ref.token;

    _classCallCheck(this, Api);

    this._url = url;
    this._token = token;
  } // Универсальный метод отправки
  // @params url - без доменного имени и порта (при наличии) и слеша вначале (вид api/work)
  // @params method - строка с наименованием метода
  // @params body - объект тела запроса. БЕЗ JSON.STRINGIFY!


  _createClass(Api, [{
    key: "getPromise",
    value: function getPromise(url, method, body) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: method,
        headers: myHeaders
      };

      if (method !== 'GET' && method !== 'DELETE') {
        requestOptions.body = JSON.stringify(body || {});
      }

      return fetch("".concat(this._url).concat(url), requestOptions).then(onResponce);
    }
  }]);

  return Api;
}();

var _default = new Api({
  url: process.env.API_LINK,
  //url API
  token: '' //auth token

});

exports["default"] = _default;