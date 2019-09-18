import models from '../database/models';

const { Attribute } = models;
class AttributeController {
    /**
     * This method get all attributes
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static async getAllAttributes(req, res, next) {
        try {
            const data = await Attribute.findAll();
            return res.status(200).json(data);
        } catch (error) {
            return res
                .status(500)
                .json({ message: 'Have not hit the database' });
        }
    }

    /**
     * This method gets a single attribute using the attribute id
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static async getSingleAttribute(req, res) {
        const { attribute_id } = req.params;
        try {
            const data = await Attribute.findOne({
                where: { attribute_id: Number(attribute_id) },
            });
            return res.status(200).json(data);
        } catch (e) {}
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
        return res.status(200).json({ message: 'this works' });
    }

    /**
     * This method gets a list attribute values in a product using the product id
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static async getProductAttributes(req, res, next) {
        // Write code to get all attribute values for a product using the product id provided in the request param
        return res.status(200).json({ message: 'this works' });
    }
}

export default AttributeController;
