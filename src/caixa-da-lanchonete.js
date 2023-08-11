import { Discount } from "./utils/discount-snack-bar.js";
import { PaymentMethodValidator } from "./utils/payment-method-validator.js";
import { DataValidator } from "./utils/type-validator.js";
import { Pedidos } from "./pedidos/pedidos-lanchonete.js";

export class CaixaDaLanchonete {
    static CARDAPIO = Pedidos.CARDAPIO;

    static calcularValorDaCompra(metodoDePagamento, itens) {
        const quantityAndAeparateProduct = [];
        const shoppingCart = [];

        const paymentMethodIsValid = PaymentMethodValidator.validatePaymentMethod(
            metodoDePagamento
        );

        const itensIsValid = DataValidator.isArrayOfString(itens);

        if (!paymentMethodIsValid) {
            return;
        }
        if (!itensIsValid) {
            console.log('Não há itens no carrinho de compra!');
            return;
        }

        const orderIsValid = Pedidos.validateExtraItemWithMainItem(itens);

        if (orderIsValid) {
            for (let i = 0; i < itens.length; i++) {
                quantityAndAeparateProduct.push(itens[i].split(','));
                Pedidos.itemCodeChecker(quantityAndAeparateProduct[i][0]);
            }
            Pedidos.productQuantityValidator(quantityAndAeparateProduct);
            for (let i = 0; i < quantityAndAeparateProduct.length; i++) {
                shoppingCart.push(
                    {
                        prod: quantityAndAeparateProduct[i][0],
                        amount: quantityAndAeparateProduct[i][1],
                        totalPrice: Pedidos.getPrice(quantityAndAeparateProduct[i][0] ) * ( quantityAndAeparateProduct[i][1]),
                    }
                );
            }
            const totalPrice = shoppingCart.reduce((total, product) => {
                return total + product.totalPrice;
            }, 0);
            
        }
        return totalPrice.toFixed(2);
    }
}


CaixaDaLanchonete.calcularValorDaCompra('debito', ['cafe,2', 'chantily,1', 'salgado,2']);


