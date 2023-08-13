// Importa o módulo PaymentMethodValidator que lida com a validação dos métodos de pagamento
import { PaymentMethodValidator } from "./payment-method-validator.js";

// Classe que gerencia o cálculo de descontos
export class Discount {

    // Método estático que aplica descontos com base no método de pagamento e valor do produto
    static discount(paymentMethod, total) {
        // Constantes para os percentuais de desconto
        const DISCOUNT_PERCENTAGE = 5;
        const ADDITIONAL_PERCENTAGE = 3;

        //Valida se o método de pagamento é válido. Se o método for válido, calcula e aplica o desconto adequado
        if (PaymentMethodValidator.validatePaymentMethod(paymentMethod) !== 'Forma de pagamento inválida.') {
            if (
                paymentMethod === PaymentMethodValidator.VALID_OPTIONS[0]
            ) {
                // Aplica desconto de 5% e retorna o novo valor
                total -= Discount.calculateDiscount(DISCOUNT_PERCENTAGE, total);
                return total;
            }
            else if (
                paymentMethod === PaymentMethodValidator.VALID_OPTIONS[1]
            ) {
                // Retorna o valor do produto sem desconto
                return total;
            }

            // Aplica adicional de 3% e retorna o novo valor
            total += Discount.calculateDiscount(ADDITIONAL_PERCENTAGE, total);
            return total;
        }

        // Retorna o valor original do produto caso o método de pagamento não seja válido
        return PaymentMethodValidator.validatePaymentMethod(paymentMethod);
    }

    // Método estático que calcula o valor do desconto com base no percentual e valor do produto, para evitar duplicações de codigo.
    static calculateDiscount(percentage, value) {
        return value * percentage / 100;
    }
}
