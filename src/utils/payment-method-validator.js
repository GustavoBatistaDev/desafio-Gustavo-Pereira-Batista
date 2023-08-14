// Importa o módulo MessageLogger para registrar mensagens
import { MessageLogger } from "./logs.js";

// Classe responsável por validar métodos de pagamento
export class PaymentMethodValidator {

    // Opções de métodos de pagamento válidos
    static VALID_OPTIONS = ['dinheiro', 'debito', 'credito'];

    // Método para validar um método de pagamento
    static validatePaymentMethod(paymentMethod) {
        // Verifica se o método de pagamento é válido ou se está vazio
        if (
            !PaymentMethodValidator.VALID_OPTIONS.includes(paymentMethod) ||
            !paymentMethod
        ) {
            MessageLogger.logMessage('Forma de pagamento inválida.');
            return 'Forma de pagamento inválida.'; // Retorna falso se o método de pagamento não for válido
        }
        return true; // Retorna verdadeiro se o método de pagamento for válido
    }
}
