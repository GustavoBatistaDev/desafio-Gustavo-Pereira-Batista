// Importando módulos e classes necessárias
import { Discount } from "./discount/discount-snack-bar.js";
import { Pedidos } from "./pedidos/pedidos-lanchonete.js";
import { MessageLogger } from "./utils/logs.js";
import { ValidatePurchase } from "./pedidos/validate-purchase.js";
import { ProcessItems } from "./pedidos/process-items.js";
import { OrderValidate } from "./pedidos/order-valid.js";
import { ShoppingCart } from "./shoppingCart/shopping-cart.js";

// Classe responsável por calcular o valor da compra na lanchonete
export class CaixaDaLanchonete {

    // Atribui o cardápio da classe Pedidos ao CaixaDaLanchonete
    static CARDAPIO = Pedidos.CARDAPIO;

    constructor() { }

    // Método para calcular o valor da compra
    calcularValorDaCompra(metodoDePagamento, itens) {
        // Verifica a validade da compra antes de prosseguir 
        const validationMessage = ValidatePurchase.isValidPurchase(metodoDePagamento, itens);

        if (validationMessage !== true) {
            return validationMessage;
        }

        // Processa os itens para criar um carrinho de compras
        const quantityAndSeparateProduct = ProcessItems.processItems(itens);

        if (
            Pedidos.productQuantityValidator(quantityAndSeparateProduct) === 'Quantidade inválida'
        ) {
            return 'Quantidade inválida';

        } else if (quantityAndSeparateProduct === 'Item inválido!') {
            return 'Item inválido!';
        }

        // Verifica se os itens e extras são válidos
        else if (OrderValidate.isOrderValid(itens, quantityAndSeparateProduct) === 'Item extra não pode ser pedido sem o principal') {
            return 'Item extra não pode ser pedido sem o principal';
        }
        // cria um objeto com cada produto e adiciona um atributo totalPrice
        const shoppingCart = ShoppingCart.calculateShoppingCart(quantityAndSeparateProduct);

        // Calcula o valor total do carrinho de compras
        const totalPrice = shoppingCart.reduce((total, product) => total + product.totalPrice, 0);

        // Calcula o desconto aplicado e formata o preço final
        const discountedTotalPrice = Discount.discount(metodoDePagamento, totalPrice);
        const formattedDiscountedTotalPrice = discountedTotalPrice.toFixed(2);

        // Exibe o valor total com desconto
        MessageLogger.logMessage(`Valor total: R$${formattedDiscountedTotalPrice}`);
        return `R$${formattedDiscountedTotalPrice}`; // Retorna o valor final
    }

}

const caixa = new CaixaDaLanchonete().calcularValorDaCompra('dinheiro', ['cafe,1']);

