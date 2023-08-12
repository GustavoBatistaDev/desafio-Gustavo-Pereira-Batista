import { MessageLogger } from "./logs.js";

// Classe utilitária para validação de dados
// Possibilidade de extensão. Open/Closed Principle
export class DataValidator {

    // Método para verificar se um dado é um array de strings
    static isArrayOfString(data) {
        // Verifica se o dado é um array
        if (!Array.isArray(data) || data.length === 0) {
            MessageLogger.logMessage('Não há itens no carrinho de compra!');
            return false;
        }
        else if (!data.every(item => typeof item === 'string')) {
            MessageLogger.logMessage('Item inválido!');
            return false;
        }

        return true;
    }
}

