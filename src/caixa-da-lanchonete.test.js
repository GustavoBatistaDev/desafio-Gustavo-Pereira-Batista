import { CaixaDaLanchonete } from './caixa-da-lanchonete.js';
import { Pedidos } from './pedidos/pedidos-lanchonete.js';
import { Discount } from './discount/discount-snack-bar.js';
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

    const testEmptyShoppingCart = (metodoDePagamento, itens, expected) => {
        it(`Deve retornar "Não há itens no carrinho de compra!"`, () => {
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


    const testIsArrayOfStringMethod = (data, expected) => {
        it(
            `deve retornar "Não há itens no carrinho de compra!"se data não for
             um array, ou se o length for 0. Deve retornar "Item inválido"
             caso não seja um array de strings`, () => {
            const resultado = DataValidator.isArrayOfString(data);
            expect(resultado).toBe(expected);
        }
        );
    };

    const testCalculateDiscountMethod = (percentage, value, expected) => {
        it(`deve calcular a porcentagem de um número e retorna-lo`, () => {
            const resultado = Discount.calculateDiscount(percentage, value);
            expect(resultado).toBe(expected);
        });
    };

    const testThrowTypeError = (products, expected) => {
        it(`deve calcular a porcentagem de um número e retorna-lo`, () => {
            const resultado = Pedidos.productQuantityValidator(products);
            expect(resultado).toBe(expected);
        });
    };
    // Testes individuais com vários cenários diferentes  

    testCalculation('dinheiro', ['cafe,1', 'sanduiche,2'], 'R$15.20');
    testCalculation('credito', ['cafe,1', 'sanduiche,2'], 'R$16.48');
    testCalculation('debito', ['cafe,1', 'sanduiche,2'], 'R$16.00');

    testCalculation('dinheiro', ['cafe,1'], 'R$2.85');
    testCalculation('credito', ['cafe,1'], 'R$3.09');
    testCalculation('debito', ['cafe,1'], 'R$3.00');

    testCalculation('credito', ['cafe,1', 'sanduiche,1', 'queijo,1'], 'R$11.85');
    testCalculation('debito', ['cafe,1', 'sanduiche,1', 'queijo,1'], 'R$11.50');
    testCalculation('dinheiro',['cafe,4', 'sanduiche,3', 'queijo,2'], 'R$33.73');

    testCalculation('credito',['cafe,4', 'sanduiche,3', 'queijo,2'], 'R$36.56');
    testCalculation('debito',['cafe,4', 'sanduiche,3', 'queijo,2'], 'R$35.50');
    testCalculation('dinheiro',['cafe,0'], 'Quantidade inválida');

    testCalculation('credito',['1'], 'Item inválido!');
    testCalculation('debito',['pizza,4'], 'Item inválido!');
    testCalculation('especie',['pizza,4'], 'Forma de pagamento inválida.');

    testCalculation('dinheiro',['chantily,1'], 'Item extra não pode ser pedido sem o principal');
    testCalculation('dinheiro',['queijo,1'], 'Item extra não pode ser pedido sem o principal');
    testCalculation('credito',['chantily,1'], 'Item extra não pode ser pedido sem o principal');

    testCalculation('credito',['queijo,1'], 'Item extra não pode ser pedido sem o principal');
    testCalculation('debito',['chantily,1'], 'Item extra não pode ser pedido sem o principal');
    testCalculation('debito',['queijo,1'], 'Item extra não pode ser pedido sem o principal');

    testCalculation('credito',['chantily,1', 'sanduiche,1'], 'Item extra não pode ser pedido sem o principal');
    testCalculation('dinheiro',['queijo,1', 'cafe,1'], 'Item extra não pode ser pedido sem o principal');
    testCalculation('credito',['queijo,1', 'cafe,1'], 'Item extra não pode ser pedido sem o principal');

    testCalculation('debito',['queijo,1', 'cafe,1'], 'Item extra não pode ser pedido sem o principal');
    testCalculation('debito',['queijo,1', 'cafe,1', 'chantily,1'], 'Item extra não pode ser pedido sem o principal');
    testCalculation('dinheiro',['queijo,1', 'cafe,1', 'chantily,1'], 'Item extra não pode ser pedido sem o principal');

    testCalculation('credito',['queijo,1', 'cafe,1', 'chantily,1'], 'Item extra não pode ser pedido sem o principal');
    testCalculation('dinheiro',['queijo,1', 'sanduiche,1', 'chantily,1'], 'Item extra não pode ser pedido sem o principal');
    testCalculation('credito',['queijo,1', 'sanduiche,1', 'chantily,1'], 'Item extra não pode ser pedido sem o principal');

    testCalculation('debito',['queijo,1', 'sanduiche,1', 'chantily,1'], 'Item extra não pode ser pedido sem o principal');
    testEmptyShoppingCart('dinheiro', [], 'Não há itens no carrinho de compra!');
    testEmptyShoppingCart('debito', [], 'Não há itens no carrinho de compra!');

    testEmptyShoppingCart('credito', [], 'Não há itens no carrinho de compra!');
    testInvalidPaymentMethod('', ['cafe,1'], 'Forma de pagamento inválida.');
    testInvalidPaymentMethod(2, ['cafe,1'], 'Forma de pagamento inválida.');

    testInvalidPaymentMethod(true, ['cafe,1'], 'Forma de pagamento inválida.');
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
    testIsArrayOfStringMethod([], 'Não há itens no carrinho de compra!');


    testIsArrayOfStringMethod([2, 'cafe'], 'Item inválido!');
    testCalculateDiscountMethod(10, 100, 10);
    testThrowTypeError([['cafe', 'a'] ], 'Quantidade inválida');



});
