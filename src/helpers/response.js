class Response {
    static errorResponse(res, code, message, status, field) {
        const errorResponse = { code, message, status, field };

        return res.status(status).json(errorResponse);
    }

    static response(res, status, data) {
        return res.status(status).json(data);
    }
}

export default Response;
