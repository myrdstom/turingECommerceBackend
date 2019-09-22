/**
 * Customer controller handles all requests that has to do with customer
 * Some methods needs to be implemented from scratch while others may contain one or two bugs
 *
 * - create - allow customers to create a new account
 * - login - allow customers to login to their account
 * - getCustomerProfile - allow customers to view their profile info
 * - updateCustomerProfile - allow customers to update their profile info like name, email, password, day_phone, eve_phone and mob_phone
 * - updateCustomerAddress - allow customers to update their address info
 * - updateCreditCard - allow customers to update their credit card number
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import { Customer } from '../database/models';
const { validationResult } = require('express-validator/check');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 *
 *
 * @class CustomerController
 */
class CustomerController {
    /**
     * create a customer record
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status, customer data and access token
     * @memberof CustomerController
     */
    static async create(req, res, next) {
        // Implement the function to create the customer account
        try {
            const { name, email, password } = req.body;
            const newUser = await Customer.findOrCreate({
                where: { email },
                defaults: { name, password },
                attributes: { exclude: ['password'] },
            });
            const status = newUser[1];
            const user = newUser[0];

            if (status === false) {
                return res.status(400).json({
                    error: {
                        status: 400,
                        code: 'USR_04',
                        message: 'The email already exist.',
                        field: 'email',
                    },
                });
            }
            const token = jwt.sign(
                {
                    data: { id: user.id, name: user.name, email: user.email },
                },
                process.env.JWT_KEY,
                { expiresIn: '24h' }
            );

            return res.status(201).json({
                customer: user,
                accessToken: `Bearer ${token}`,
                expires_in: '24h',
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                error: {
                    status: 500,
                    message: 'you suck',
                },
            });
        }
    }

    /**
     * log in a customer
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status, and access token
     * @memberof CustomerController
     */
    static async login(req, res, next) {
        // implement function to login to user account
        try {

            const errors = validationResult(req);
            const { email, password } = req.body;
            const user = await Customer.findOne({
                where: { email },
            });
            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });
                return;
            }
            if (!user) {
                return res.status(400).json({
                    error: {
                        status: 400,
                        code: 'USR_05',
                        message: "The email doesn't exist.",
                        field: 'email',
                    },
                });
            }
            // if (!errors.isEmpty()) {
            //     return res.status(422).json({ errors: errors.array() });
            // }
            const verifyPassword = bcrypt.compareSync(password, user.password);
            if (!verifyPassword) {
                return res.status(400).json({
                    error: {
                        status: 400,
                        code: 'USR_01',
                        message: 'Invalid password, please try again.',
                        field: 'password',
                    },
                });
            }
            const token = jwt.sign(
                {
                    data: {
                        customer_id: user.customer_id,
                        name: user.name,
                        email: user.email,
                    },
                },
                process.env.JWT_KEY,
                { expiresIn: '24h' }
            );

            return res.status(200).json({
                customer: user,
                accessToken: `Bearer ${token}`,
                expires_in: '24h',
            });
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * get customer profile data
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status customer profile data
     * @memberof CustomerController
     */
    static async getCustomerProfile(req, res, next) {
        // fix the bugs in this code
        const { customer_id } = req; // eslint-disable-line
        try {
            const customer = await Customer.findByPk(customer_id);
            return res.status(400).json({
                customer,
            });
        } catch (error) {
            return next(error);
        }
    }

    /**
     * update customer profile data such as name, email, password, day_phone, eve_phone and mob_phone
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status customer profile data
     * @memberof CustomerController
     */
    static async updateCustomerProfile(req, res, next) {
        // Implement function to update customer profile like name, day_phone, eve_phone and mob_phone
        return res.status(200).json({ message: 'this works' });
    }

    /**
     * update customer profile data such as address_1, address_2, city, region, postal_code, country and shipping_region_id
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status customer profile data
     * @memberof CustomerController
     */
    static async updateCustomerAddress(req, res, next) {
        // write code to update customer address info such as address_1, address_2, city, region, postal_code, country
        // and shipping_region_id
        return res.status(200).json({ message: 'this works' });
    }

    /**
     * update customer credit card
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status customer profile data
     * @memberof CustomerController
     */
    static async updateCreditCard(req, res, next) {
        // write code to update customer credit card number
        return res.status(200).json({ message: 'this works' });
    }
}

export default CustomerController;
