class ModelHelpers {
    constructor(model) {
        this.model = model;
    }

    async findOne(options) {
        return await this.model.findAll({
            limit: 1,
            where: { ...options },
        });
    }
    async findMany(params, otherOptions = {}) {
        return await this.model.findAll({
            where: { ...params },
            ...otherOptions,
        });
    }
}

export default ModelHelpers;
