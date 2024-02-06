import { config } from './config';

const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};
class Api {
    constructor({ url, token }) {
        this._url = url;
        this._token = token;
    }
    /*examples requests*/
    getPosts(itemID) {
        const requestUrl = itemID ? `${this._url}/posts/${itemID}` : `${this._url}/posts`;
        return fetch(requestUrl, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(onResponce);
    }
    addPosts(post) {
        return fetch(`${this._url}/posts`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        }).then(onResponce);
    }

}

export default new Api(config);
