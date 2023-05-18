class ErrorAPI extends Error {
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ErrorAPI(400, message)
    }

    static internal(message) {
        return new ErrorAPI(500, message)
    }

    static forbidden(message) {
        return new ErrorAPI(403, message)
    }
}

module.exports = ErrorAPI