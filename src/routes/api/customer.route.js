import { Router } from 'express';
import CustomerController from '../../controllers/customer.controller';
import Validations from '../../util/validation';
import verifyToken from '../../util/verifyToken';

// These are valid routes but they may contain a bug, please try to define and fix them

const router = Router();
router.post(
    '/customers',
    Validations.validity('create'),
    CustomerController.create
);
router.post('/customers/creditCard', CustomerController.updateCreditCard);
router.post(
    '/customers/login',
    Validations.validity('login'),
    CustomerController.login
);
router.get(
    '/customer',
    verifyToken.authenticate,
    CustomerController.getCustomerProfile
);
router.put('/customer', CustomerController.apply);
router.put('/customer/address', CustomerController.updateCustomerAddress);
router.put('/customer/creditCard', CustomerController.updateCreditCard);

export default router;
