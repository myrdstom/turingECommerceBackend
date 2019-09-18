class Response {
    static errorResponse(res, code, message, status, field) {
        const errorResponse = { code, message, status, field };

        return res.status(status).json(errorResponse);
    }

    static response(res, status, rows = null, count = null) {
        const payload = { rows };
        return res.status(status).json(payload);
    }
}

export default Response;
