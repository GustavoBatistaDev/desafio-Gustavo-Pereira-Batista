import { Pedidos } from "../pedidos/pedidos-lanchonete";

export class ShoppingCart {
    // Calcula o valor total de cada item no carrinho de compras
    static calculateShoppingCart(itens) {
        return itens.map(([prod, amount]) => ({
            prod,
            amount,
            totalPrice: Pedidos.getPrice(prod) * amount,
        }));
    }
}