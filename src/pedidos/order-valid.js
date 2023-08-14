import { Pedidos } from "../pedidos/pedidos-lanchonete.js";

export class OrderValidate {
    static isOrderValid(itens, quantityAndSeparateProduct) {
        if (Pedidos.validateExtraItemWithMainItem(itens) === 'Item extra não pode ser pedido sem o principal') {
            return 'Item extra não pode ser pedido sem o principal'; // Retorna falso se a ordem dos itens for inválida
        }

        if (Pedidos.productQuantityValidator(quantityAndSeparateProduct) === 'Quantidade inválida') {
            return 'Quantidade inválida'; // Retorna falso se as quantidades dos produtos forem inválidas
        }

        return true; // Retorna verdadeiro se a ordem for válida
    }
}