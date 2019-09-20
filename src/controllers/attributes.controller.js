import models from '../database/models';
import { Response } from '../helpers';
import flattenObject from '../util/utils';

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
            return Response.response(res, 200, data);
        } catch (error) {
            return Response.errorResponse(
                res,
                undefined,
                'An Error Occurred',
                '500'
            );
        }
    }

    /**
     * This method gets a single attribute using the attribute id
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static async getSingleAttribute(req, res, next) {
        // eslint-disable-next-line camelcase
        const { attributeId } = req.params;
        try {
            const data = await attribute.findAll({
                where: { attribute_id: Number(attributeId) },
            });

            if (data.length === 0) {
                return Response.errorResponse(
                    res,
                    'CAT_01',
                    "Don't exist attribute with this ID",
                    404
                );
            }

            return Response.response(res, 200, data);
        } catch (e) {
            return Response.errorResponse(
                res,
                undefined,
                'An Error Occurred',
                '500'
            );
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
        // eslint-disable-next-line camelcase
        const { attributeId } = req.params;
        try {
            const data = await attributeValue.findAll({
                where: { attribute_id: Number(attributeId) },
            });

            if (data.length === 0) {
                return Response.errorResponse(
                    res,
                    'CAT_01',
                    "Don't exist attribute with this ID",
                    404
                );
            }
            return Response.response(res, 200, data);
        } catch (e) {
            return Response.errorResponse(
                res,
                undefined,
                'An Error Occurred please',
                '500'
            );
        }
    }

    /**
     * This method gets a list attribute values in a product using the product id
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static async getProductAttributes(req, res, next) {
        // Write code to get all attribute values for a product using the product id provided in the request param
        const { productId } = req.params;
        try {
            let data = await productAttribute.findAll({
                where: { product_id: Number(productId) },
                attributes: ['attribute_value_id'],
                include: [
                    {
                        model: attributeValue,
                        attributes: [['value', 'attribute_value']],
                        include: [
                            {
                                model: attribute,
                                as: 'attribute_type',
                                attributes: [['name', 'attribute_name']],
                            },
                        ],
                    },
                ],
            });

            data = data.map(newData => flattenObject(newData.toJSON()));

            if (data.length === 0) {
                return Response.errorResponse(
                    res,
                    'CAT_01',
                    "Don't exist attribute with this ID",
                    404
                );
            }
            return Response.response(res, 200, data);
        } catch (e) {
            return Response.errorResponse(
                res,
                undefined,
                'An Error Occurred',
                '500'
            );
        }
    }
}

export default AttributeController;
