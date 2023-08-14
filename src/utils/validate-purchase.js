import { DataValidator } from "./type-validator.js";
import { PaymentMethodValidator } from "./payment-method-validator.js";

export class ValidatePurchase {
    static isValidPurchase(metodoDePagamento, itens) {
        if (DataValidator.isArrayOfString(itens) === 'Item inválido!') {
            return 'Item inválido!';
        }
        if (DataValidator.isArrayOfString(itens) === 'Não há itens no carrinho de compra!') {
            return 'Não há itens no carrinho de compra!'; // Retorna falso se os itens não forem um array de strings
        }

        if (
            PaymentMethodValidator.validatePaymentMethod(metodoDePagamento) === 'Forma de pagamento inválida.'
        ) {
            return 'Forma de pagamento inválida.'; // Retorna falso se o método de pagamento for inválido
        }

        return true; // Retorna verdadeiro se a compra for válida
    }
}