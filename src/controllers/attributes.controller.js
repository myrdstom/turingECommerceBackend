import models from '../database/models';

const { attribute, attributeValue, productAttribute } = models;
class AttributeController {
    /**
     * This method get all attributes
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static async getAllAttributes(req, res, next) {
        try {
            const data = await attribute.findAll();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                error: {
                    status: 500,
                    message: error.name,
                },
            });
        }
    }

    /**
     * This method gets a single attribute using the attribute id
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static async getSingleAttribute(req, res) {
        // eslint-disable-next-line camelcase
        const { attribute_id } = req.params;
        try {
            const data = await attribute.findOne({
                where: { attribute_id: Number(attribute_id) },
            });
            if (!data) {
                return res.status(404).json({
                    error: {
                        status: 404,
                        code: 'ATTR_01',
                        message: "Don't exist attribute with this ID",
                    },
                });
            }
            return res.status(200).json(data);
        } catch (e) {
            return res.status(400).json({
                error: {
                    status: 400,
                    code: 'ATTR_02',
                    message: 'The ID is not a number.',
                },
            });
        }
    }

    /**
     * This method gets a list attribute values in an attribute using the attribute id
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static async getAttributeValues(req, res, next) {
        // Write code to get all attribute values for an attribute using the attribute id provided in the request param
        // This function takes the param: attribute_id
        const { attribute_id } = req.params;
        try {
            const data = await attributeValue.findAll({
                where: { attribute_id: Number(attribute_id) },
            });

            if (!data) {
                return res.status(404).json({
                    error: {
                        status: 404,
                        code: 'ATTR_01',
                        message: "Don't exist attribute with this ID",
                    },
                });
            }
            return res.status(200).json(data);
        } catch (e) {
            return res.status(400).json({
                error: {
                    status: 400,
                    code: 'ATTR_02',
                    message: 'The ID is not a number.',
                },
            });
        }
    }

    /**
     * This method gets a list attribute values in a product using the product id
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static async getProductAttributes(req, res) {
        // Write code to get all attribute values for a product using the product id provided in the request param
        const { product_id } = req.params;
        try {
            const data = await productAttribute.findAll({
                where: { product_id: Number(product_id) },
                include: [
                    {
                        model: attributeValue,
                    },
                ],
            });
            if (!data) {
                return res.status(404).json({
                    error: {
                        status: 404,
                        code: 'PRD_01',
                        message: "Don't exist attribute with this ID",
                    },
                });
            }
            return res.status(200).json(data);
        } catch (e) {
            return res.status(400).json({
                error: {
                    status: 400,
                    code: 'ATTR_02',
                    message: 'The ID is not a number.',
                },
            });
        }
    }
}

export default AttributeController;
