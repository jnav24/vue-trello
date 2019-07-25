import axios from 'axios';

const domain = process.env.VUE_APP_TRELLO_API;
const key = process.env.VUE_APP_TRELLO_KEY
const token = process.env.VUE_APP_TRELLO_TOKEN

export default class HttpService {
    /**
     * Run GET method on a request
     *
     * @param data {Object} {
    *   url {string}
    *   params {object}
    * }
     * @return {Promise}
     */
    async get(data) {
        return await axios({
            method: 'GET',
            url: domain + data.url + `?key=${key}&token=${token}`,
            params: data.params || {},
        });
    }

    /**
     * Run POST method on a request
     *
     * @param data {Object} {
    *   url {string}
    *   params {object}
    * }
     * @return {Promise}
     */
    async post(data) {
        return await axios({
            method: 'POST',
            url: domain + data.url,
            data: data.params || {}
        });
    }

    /**
     * For situations where API expects a param like obj[key]=value
     * Axios does not seem to have a work around for this, so use this method
     * and add it to the url string
     *
     * @param name {string}
     * @param objList {Array}
     * @returns {string}
     */
    urlArrayBuilder(name, objList) {
        let result = '';
        let delim = '';

        for (const item in objList) {
            result += `${delim}${name}[${item}]=${objList[item]}`;
            delim = '&';
        }

        return result;
    }
}
