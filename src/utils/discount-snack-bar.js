import { PaymentMethodValidator } from "./payment-method-validator.js";

export class Discount {

    static discount(paymentMethod, productValue) {
        const DISCOUNT_PERCENTAGE = 5;
        const ADDITIONAL_PERCENTAGE = 3;

        const methodIsValid = PaymentMethodValidator.validatePaymentMethod(paymentMethod);
        if (methodIsValid) {
            if (
                paymentMethod === PaymentMethodValidator.VALID_OPTIONS[0]
            ) {
                productValue -= Discount.discountCalculator(DISCOUNT_PERCENTAGE, productValue);
                return productValue;
            }
            else if (
                paymentMethod === PaymentMethodValidator.VALID_OPTIONS[1]
            ) {
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

// alterar logica de debito, refatorar product extras