import { InvalidPaymentMethodError } from "../errors/errors.js";

export class PaymentMethodValidator {
    constructor() { }

    static VALID_OPTIONS = ['dinheiro', 'débito', 'crédito'];

    static validatePaymentMethod(paymentMethod) {
        paymentMethod = paymentMethod.toLowerCase();
        if (!PaymentMethodValidator.VALID_OPTIONS.includes(paymentMethod)) {
            console.log('Forma de pagamento inválida.');// possibilidade de implementar o customError InvalidPaymentMethodError
            return false;
        }
        return true;
    }
}
