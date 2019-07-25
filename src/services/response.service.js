export default class ResponseService {
    constructor() {
        this.failedMessage = 'Something unexpected happened. Please try again later.';
    }

    getSuccess(data = [], msg = '', status = 200) {
        return {
            data,
            message: msg,
            status,
            success: true,
        }
    }

    getFailure(msg = '', status = 401) {
        if (!msg || !msg.trim()) {
            msg = this.failedMessage;
        }

        return {
            success: false,
            status,
            message: msg,
        };
    }

    isSuccess(response) {
        return response.status >= 200 && response.status < 300;
    }
}
