
const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};
class Api {
    constructor({ url, token }) {
        this._url = url;
        this._token = token;
    }

// Универсальный метод отправки
// @params url - без доменного имени и порта (при наличии) и слеша вначале (вид api/work)
// @params method - строка с наименованием метода
// @params body - объект тела запроса. БЕЗ JSON.STRINGIFY!

    getPromise(url, method, body) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: method,
            headers: myHeaders,
        };
        if (method !=='GET' && method !== 'DELETE'){
            requestOptions.body = JSON.stringify(body || {})
        }

        return fetch(`${this._url}${url}`, requestOptions).then(onResponce);
    }

}

export default new Api({
    url: process.env.API_LINK, //url API
    token: '', //auth token
});
