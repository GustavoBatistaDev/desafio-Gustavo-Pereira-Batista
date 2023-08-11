import { PaymentMethodValidator } from "./payment-method-validator.js";

export class Discount {
    constructor() { }

    static discount(paymentMethod, productValue) {
        const DISCOUNT_PERCENTAGE = 5;
        const ADDITIONAL_PERCENTAGE = 3;

        const methodIsValid = validatePaymentMethod.validatePaymentMethod(paymentMethod);
        if (methodIsValid) {
            if (
                paymentMethod === PaymentMethodValidator.VALID_OPTIONS[0] ||
                paymentMethod === PaymentMethodValidator.VALID_OPTIONS[1]
            ) {
                productValue -= Discount.discountCalculator(DISCOUNT_PERCENTAGE, productValue);
                return productValue;
            }
            productValue += Discount.discountCalculator(ADDITIONAL_PERCENTAGE, productValue);
            return productValue;
        }
        return productValue;
    }

    static discountCalculator(percentage, value) {
        return value * percentage / 100;
    }
}

