import { CaixaDaLanchonete } from './caixa-da-lanchonete';
import { Pedidos } from './pedidos/pedidos-lanchonete.js';
import { Discount } from './utils/discount-snack-bar.js';
import { DataValidator } from './utils/type-validator.js';

describe('CaixaDaLanchonete', () => {

    let caixa;

    // Cria uma instância de CaixaDaLanchonete antes de cada Each(teste)
    beforeEach(() => {
        caixa = new CaixaDaLanchonete();
    });

    // Função para testar o cálculo do valor da compra de acordo com o método de pagamento
    const testCalculation = (metodoDePagamento, itens, expected) => {
        it(`deve calcular corretamente com método "${metodoDePagamento}"`, () => {
            const resultado = caixa.calcularValorDaCompra(metodoDePagamento, itens);
            expect(resultado).toBe(expected);
        });
    };

    // Função para testar método de pagamento que não é aceito
    const testInvalidPaymentMethod = (metodoDePagamento, itens, expected) => {
        it(`deve retornar mensagem de erro para método "${metodoDePagamento}" inválido`, () => {
            const resultado = caixa.calcularValorDaCompra(metodoDePagamento, itens);
            expect(resultado).toBe(expected);
        });
    };

    // Função para testar a presença de item extra sem o principal 
    const testExtraWithoutMainProduct = (metodoDePagamento, itens, expected) => {
        it(`deve retornar mensagem de "Item extra não pode ser pedido sem o principal"`, () => {
            const resultado = caixa.calcularValorDaCompra(metodoDePagamento, itens);
            expect(resultado).toBe(expected);
        });
    };

    // Função para testar quantidades de produtos que não são números (inválidos)
    const testProductQuantity = (metodoDePagamento, itens, expected) => {
        it(`deve retornar mensagem de "Quantidade inválida"`, () => {
            const resultado = caixa.calcularValorDaCompra(metodoDePagamento, itens);
            expect(resultado).toBe(expected);
        });
    };

    // Função para testar a validação de itens que não estão no cardápio
    const testItemIsValid = (metodoDePagamento, itens, expected) => {
        it(`deve retornar mensagem de "Item inválido!"`, () => {
            const resultado = caixa.calcularValorDaCompra(metodoDePagamento, itens);
            expect(resultado).toBe(expected);
        });
    };

    const testGetPriceMethod = (cod, expected) => {
        it(`deve retornar mensagem de "Código do produto é inválido!"`, () => {
            const resultado = Pedidos.getPrice(cod);
            expect(resultado).toBe(expected);
        });
    };

    const testDiscountMethod = (metodoDePagamento, total, expected) => {
        it(`deve retornar false se o método de pagamento for inválido`, () => {
            const resultado = Discount.discount(metodoDePagamento, total);
            expect(resultado).toBe(expected);
        });
    };


    const testisArrayOfStringMethod = (data, expected) => {
        it(`deve retornar false se se data não for um array de string ou se o length de data for zero`, () => {
            const resultado = DataValidator.isArrayOfString(data);
            expect(resultado).toBe(expected);
        });
    };
 
    // Testes individuais com vários cenários diferentes  

    testCalculation('dinheiro', ['cafe,1', 'sanduiche,2'], 'R$15.20');
    testCalculation('credito', ['cafe,1', 'sanduiche,2'], 'R$16.48');
    testCalculation('debito', ['cafe,1', 'sanduiche,2'], 'R$16.00');

    testInvalidPaymentMethod('', ['cafe,1'], 'Forma de pagamento inválida.');
    testInvalidPaymentMethod(2, ['cafe,1'], 'Forma de pagamento inválida.');
    testInvalidPaymentMethod(true, ['cafe,1'] ,'Forma de pagamento inválida.');

    testExtraWithoutMainProduct('dinheiro', ['chantily,1'], 'Item extra não pode ser pedido sem o principal');
    testExtraWithoutMainProduct('dinheiro', ['queijo,1'], 'Item extra não pode ser pedido sem o principal');

    testProductQuantity('dinheiro', ['cafe,'], 'Quantidade inválida');
    testProductQuantity('dinheiro', ['cafe'], 'Quantidade inválida');
    testProductQuantity('dinheiro', ['cafe,a'], 'Quantidade inválida');

    testItemIsValid('dinheiro', ['churros,1'], 'Item inválido!');
    testItemIsValid('dinheiro', [2], 'Item inválido!');
    testItemIsValid('dinheiro', [true], 'Item inválido!');

    testGetPriceMethod('codigoInvalido', 'Código do produto é inválido!');

    testDiscountMethod('metodoInvalido', 20.00, 'Forma de pagamento inválida.');

    testisArrayOfStringMethod([], false)

});
