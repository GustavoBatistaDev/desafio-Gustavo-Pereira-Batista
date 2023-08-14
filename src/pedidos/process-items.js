import { Pedidos } from "../pedidos/pedidos-lanchonete.js";

export class ProcessItems{
    static processItems(itens) {
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
}