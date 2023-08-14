// Importando módulos e classes necessárias
import { Discount } from "./utils/discount-snack-bar.js";
import { PaymentMethodValidator } from "./utils/payment-method-validator.js";
import { DataValidator } from "./utils/type-validator.js";
import { Pedidos } from "./pedidos/pedidos-lanchonete.js";
import { MessageLogger } from "./utils/logs.js";

// Classe responsável por calcular o valor da compra na lanchonete
export class CaixaDaLanchonete {

    // Atribui o cardápio da classe Pedidos ao CaixaDaLanchonete
    static CARDAPIO = Pedidos.CARDAPIO;

    constructor() { }

    // Método para calcular o valor da compra
    calcularValorDaCompra(metodoDePagamento, itens) {
        // Verifica a validade da compra antes de prosseguir 
        const validationMessage = this.isValidPurchase(metodoDePagamento, itens);

        if (validationMessage === 'Não há itens no carrinho de compra!') {
            return validationMessage;
        }
        
        if (validationMessage === 'Item inválido!') {
            return validationMessage;
        }
        
        else if (validationMessage === 'Forma de pagamento inválida.') {
            return validationMessage;
        }        

        // Processa os itens para criar um carrinho de compras
        const quantityAndSeparateProduct = this.processItems(itens);

        if (
            Pedidos.productQuantityValidator(quantityAndSeparateProduct) === 'Quantidade inválida'
        ) {
            return 'Quantidade inválida';
            
        }else if(quantityAndSeparateProduct === 'Item inválido!'){
            return 'Item inválido!';
        }

        // Verifica se os itens e extras são válidos
        else if (this.isOrderValid(itens, quantityAndSeparateProduct) === 'Item extra não pode ser pedido sem o principal') {
            return 'Item extra não pode ser pedido sem o principal';
        }
        // cria um objeto com cada produto e adiciona um atributo totalPrice
        const shoppingCart = this.calculateShoppingCart(quantityAndSeparateProduct);

        // Calcula o valor total do carrinho de compras
        const totalPrice = shoppingCart.reduce((total, product) => total + product.totalPrice, 0);

        // Calcula o desconto aplicado e formata o preço final
        const discountedTotalPrice = Discount.discount(metodoDePagamento, totalPrice);
        const formattedDiscountedTotalPrice = discountedTotalPrice.toFixed(2);

        // Exibe o valor total com desconto
        MessageLogger.logMessage(`Valor total: R$${formattedDiscountedTotalPrice}`);
        return `R$${formattedDiscountedTotalPrice}`; // Retorna o valor final
    }

    // Verifica se a compra é válida com base no método de pagamento e nos itens
    isValidPurchase(metodoDePagamento, itens) {
        if(DataValidator.isArrayOfString(itens) === 'Item inválido!'){
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

    // Processa os itens do carrinho, dividindo código e quantidade
    processItems(itens) {
        const quantityAndSeparateProduct = [];
        for (let i = 0; i < itens.length; i++) {
            const [code, amount] = itens[i].split(','); // Divide o item em código e quantidade
            if (Pedidos.itemCodeChecker(code) === 'Item inválido!') {
                return 'Item inválido!'; // Retorna caso o código do item seja inválido
            }

            quantityAndSeparateProduct.push([code, amount]); // Armazena código e quantidade
        }
        return quantityAndSeparateProduct; // Retorna a lista de itens processados
    }

    // Verifica se a ordem dos itens e extras é válida
    isOrderValid(itens, quantityAndSeparateProduct) {
        if (Pedidos.validateExtraItemWithMainItem(itens) === 'Item extra não pode ser pedido sem o principal') {
            return 'Item extra não pode ser pedido sem o principal'; // Retorna falso se a ordem dos itens for inválida
        }

        if (Pedidos.productQuantityValidator(quantityAndSeparateProduct) === 'Quantidade inválida') {
            return 'Quantidade inválida'; // Retorna falso se as quantidades dos produtos forem inválidas
        }

        return true; // Retorna verdadeiro se a ordem for válida
    }

    // Calcula o valor total de cada item no carrinho de compras
    calculateShoppingCart(itens) {
        return itens.map(([prod, amount]) => ({
            prod,
            amount,
            totalPrice: Pedidos.getPrice(prod) * amount,
        }));
    }
}

const caixa = new CaixaDaLanchonete().calcularValorDaCompra('dinheiro', [2]);