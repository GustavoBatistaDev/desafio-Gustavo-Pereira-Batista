import { Discount } from "./utils/discount-snack-bar.js";
import { PaymentMethodValidator } from "./utils/payment-method-validator.js";
import { DataValidator } from "./utils/type-validator.js";
import { Pedidos } from "./pedidos/pedidos-lanchonete.js";

class CaixaDaLanchonete {

    static calcularValorDaCompra(metodoDePagamento, itens) {
        const paymentMethodIsValid = PaymentMethodValidator.validatePaymentMethod(
            metodoDePagamento
        );
        const itensIsValid = DataValidator.isArrayOfString(itens);

        if (!paymentMethodIsValid) {
            return;
        }
        if (!itensIsValid) {
            console.log('itens inválidos.');
            return;
        }

        const orderIsValid = Pedidos.validateExtraItemWithMainItem(itens);

        return "";
    }


}


CaixaDaLanchonete.calcularValorDaCompra('dinheiro', ['queijo,1']);
export { CaixaDaLanchonete };

