import { Discount } from "./utils/discount-snack-bar.js";
import { PaymentMethodValidator } from "./utils/payment-method-validator.js";
import { DataValidator } from "./utils/type-validator.js";
import { Pedidos } from "./pedidos/pedidos-lanchonete.js";

class CaixaDaLanchonete {

    static calcularValorDaCompra(metodoDePagamento, itens) {
        const quantityAndAeparateProduct = [];


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
        const error = null;
        if (orderIsValid) {
            for (let i = 0; i < itens.length; i++) {
                quantityAndAeparateProduct.push(itens[i].split(','));

            }
            Pedidos.itemCodeChecker();

            Pedidos.productQuantityValidator(quantityAndAeparateProduct);

            Pedidos.CalculatePurchaseAmount(quantityAndAeparateProduct);



        }

        return "";
    }




}


CaixaDaLanchonete.calcularValorDaCompra('dinheiro', ['cafe,2', 'sanduidche,2', 'cafe,2']);
export { CaixaDaLanchonete };

