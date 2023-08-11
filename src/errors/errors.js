export class InvalidPaymentMethodError extends Error {
    constructor() {
        super('Método de pagamento inválido. Escolha entre "dinheiro", "débito" ou "crédito".');
        this.name = 'InvalidPaymentMethodError';
    }
}
