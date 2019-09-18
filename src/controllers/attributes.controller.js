import models from '../database/models';
import { ModelHelpers, Response } from '../helpers';

const { attribute, attributeValue, productAttribute } = models;
class AttributeController {
    /**
     * This method get all attributes
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static async getAllAttributes(req, res, next) {
        const helpers = new ModelHelpers(attribute);
        try {
            const data = await helpers.findMany();
            return Response.response(res, 200, data);
        } catch (error) {
            return Response.errorResponse(
                res,
                '500',
                'An Error Occured',
                '200',
                'example'
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
        const helpers = new ModelHelpers(attribute);
        try {
            const data = await helpers.findOne({
                attribute_id: Number(attribute_id),
            });
            // const data = await attribute.findOne({
            //     where: { attribute_id: Number(attribute_id) },
            // });

            if (!data) {
                return Response.errorResponse(
                    res,
                    'CAT_01',
                    "Don't exist attribute with this ID",
                    404
                );
            }

            return res.status(200).json(data);
        } catch (e) {
            return Response.errorResponse(
                res,
                undefined,
                'An Error Occurred please review your inputs',
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
        const { attribute_id } = req.params;
        try {
            const data = await attributeValue.findAll({
                where: { attribute_id: Number(attribute_id) },
            });

            if (!data) {
                return res.status(404).json({
                    error: {
                        status: 404,
                        code: 'CAT_01',
                        message: "Don't exist attribute with this ID",
                    },
                });
            }
            return res.status(200).json(data);
        } catch (e) {
            return Response.errorResponse(
                res,
                undefined,
                'An Error Occurred please review your inputs',
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
    static async getProductAttributes(req, res) {
        // Write code to get all attribute values for a product using the product id provided in the request param
        const { product_id } = req.params;
        const helpers = new ModelHelpers(productAttribute);
        try {
            const data = await helpers.findMany(
                { product_id: Number(product_id) },
                {
                    include: [
                        {
                            model: attributeValue,
                        },
                    ],
                }
            );
            if (!data) {
                return Response.errorResponse(
                    res,
                    'PRD_01',
                    "Don't exist attribute with this ID",
                    404
                );
            }
            return res.status(200).json(data);
        } catch (e) {
            return Response.errorResponse(
                res,
                undefined,
                'An Error Occurred please review your inputs',
                '500'
            );
        }
    }
}

export default AttributeController;
