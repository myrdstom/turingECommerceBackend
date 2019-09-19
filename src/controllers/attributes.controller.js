import models from '../database/models';
import { ModelHelpers, Response } from '../helpers';

const { attribute, attributeValue, productAttribute } = models;

const attributeHelper = new ModelHelpers(attribute);
const attributeValueHelper = new ModelHelpers(attributeValue);
const productAttributeHelper = new ModelHelpers(productAttribute);
class AttributeController {
    /**
     * This method get all attributes
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static async getAllAttributes(req, res, next) {
        try {
            const data = await attributeHelper.findMany();
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
        const { attribute_id } = req.params;
        try {
            const data = await attributeHelper.findOne({
                attribute_id: Number(attribute_id),
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
        const { attribute_id } = req.params;
        try {
            const data = await attributeValueHelper.findMany({
                attribute_id: Number(attribute_id),
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
        const { product_id } = req.params;
        try {
            const data = await productAttributeHelper.findMany(
                { product_id: Number(product_id) },
                {
                    include: [
                        {
                            model: attributeValue,
                        },
                    ],
                }
            );
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
