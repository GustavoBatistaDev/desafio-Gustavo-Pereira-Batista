import { Discount } from "./utils/discount-snack-bar.js";
import { PaymentMethodValidator } from "./utils/payment-method-validator.js";
import { DataValidator } from "./utils/type-validator.js";
import { Pedidos } from "./pedidos/pedidos-lanchonete.js";
import { MessageLogger } from "./utils/logs.js";

export class CaixaDaLanchonete {

    static CARDAPIO = Pedidos.CARDAPIO;

    constructor() { }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.isValidPurchase(metodoDePagamento, itens)) {
            return;
        }

        const quantityAndSeparateProduct = this.processItems(itens);

        if (!this.isOrderValid(itens, quantityAndSeparateProduct)) {
            return;
        }

        const shoppingCart = this.calculateShoppingCart(quantityAndSeparateProduct);

        const totalPrice = shoppingCart.reduce((total, product) => total + product.totalPrice, 0);
        const discountedTotalPrice = Discount.discount(metodoDePagamento, totalPrice);
        const formattedDiscountedTotalPrice = discountedTotalPrice.toFixed(2);

        MessageLogger.logMessage(`Valor total: R$${formattedDiscountedTotalPrice}`);
        return formattedDiscountedTotalPrice;
    }

    isValidPurchase(metodoDePagamento, itens) {
        if (!PaymentMethodValidator.validatePaymentMethod(metodoDePagamento)) {
            return false;
        }

        if (!DataValidator.isArrayOfString(itens)) {
            return false;
        }

        return true;
    }

    processItems(itens) {


        const quantityAndSeparateProduct = [];
        for (let i = 0; i < itens.length; i++) {
            const [code, amount] = itens[i].split(','); // Divide o item em código e quantidade
            if (!Pedidos.itemCodeChecker(code)) {
                return;
            }

            quantityAndSeparateProduct.push([code, amount]); // Armazena código e quantidade
        }
        return quantityAndSeparateProduct;
    }

    isOrderValid(itens, quantityAndSeparateProduct) {
        if (!Pedidos.validateExtraItemWithMainItem(itens)) {
            return false;
        }

        if (!Pedidos.productQuantityValidator(quantityAndSeparateProduct)) {
            return false;
        }

        return true;
    }

    calculateShoppingCart(itens) {
        return itens.map(([prod, amount]) => ({
            prod,
            amount,
            totalPrice: Pedidos.getPrice(prod) * amount,
        }));
    }
}

// Exemplo de uso do método calcularValorDaCompra
const caixa1 = new CaixaDaLanchonete();
caixa1.calcularValorDaCompra('debito', ['queijo,2']);
