import { Router } from 'express';
import CustomerController from '../../controllers/customer.controller';
import Validations from '../../middleware/authenticate';

// These are valid routes but they may contain a bug, please try to define and fix them

const router = Router();
router.post('/customers', CustomerController.create);
router.post('/customers/creditCard', CustomerController.updateCreditCard);
router.post(
    '/customers/login',
    Validations.validity('login'),
    CustomerController.login
);
router.get('/customer', CustomerController.getCustomerProfile);
router.put('/customer', CustomerController.apply);
router.put('/customer/address', CustomerController.updateCustomerAddress);
router.put('/customer/creditCard', CustomerController.updateCreditCard);

export default router;
