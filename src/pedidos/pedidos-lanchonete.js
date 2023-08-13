import { MessageLogger } from "../utils/logs.js";


export class Pedidos {

    // Definição do cardápio com códigos, descrições e valores
    static CARDAPIO = [
        { cod: 'cafe', description: 'Café', value: 3.00 },
        { cod: 'chantily', description: 'Chantily (extra do Café)', value: 1.50 },
        { cod: 'suco', description: 'Suco Natural', value: 6.20 },
        { cod: 'sanduiche', description: 'Sanduíche', value: 6.50 },
        { cod: 'queijo', description: 'Queijo (extra do Sanduíche)', value: 2.00 },
        { cod: 'salgado', description: 'Salgado', value: 7.25 },
        { cod: 'combo1', description: '1 Suco e 1 Sanduíche', value: 9.50 },
        { cod: 'combo2', description: '1 Café e 1 Sanduíche', value: 7.50 },
    ];

    // Valida se um item extra foi pedido sem seu principal correspondente
    static validateExtraItemWithMainItem(itens) {
        const itemsWithoutQuantity = [];

        // Separa os itens da quantidade e os armazena em um Array
        for (let i = 0; i < itens.length; i++) {
            itemsWithoutQuantity.push(itens[i].split(',')[0]);
        }

        // Verifica se um item extra é pedido sem seu principal correspondente
        if (
            itemsWithoutQuantity.includes(Pedidos.CARDAPIO[1].cod) &&
            !itemsWithoutQuantity.includes(Pedidos.CARDAPIO[0].cod) ||
            itemsWithoutQuantity.includes(Pedidos.CARDAPIO[4].cod) &&
            !itemsWithoutQuantity.includes(Pedidos.CARDAPIO[3].cod)
        ) {
            MessageLogger.logMessage("Item extra não pode ser pedido sem o principal");
            return "Item extra não pode ser pedido sem o principal";
        }
        return true;
    }

    // Obtém o valor de um item do cardápio pelo seu código
    static getPrice(cod) {
        const product = Pedidos.CARDAPIO.filter(
            prod => prod.cod === cod
        );

        return product.length > 0 ? product[0].value : 'Código do produto é inválido!';
    }

    // Valida a quantidade de produtos, convertendo-os para números
    static productQuantityValidator(products) {
        if (!Array.isArray(products)) {
            return;
        }

        let error = null;
        const productQuantity = [];

        // Separa os itens da quantidade e os armazena em um Array
        for (let i = 0; i < products.length; i++) {
            productQuantity.push(products[i][1]);['code', 3]
        }

        // Converte as quantidades de produtos para números e verifica se são válidos
        for (let i = 0; i < productQuantity.length; i++) {
            try {
                productQuantity[i] = Number(productQuantity[i]);
                if (productQuantity[i] === 0) {
                    error = true;
                }
            } catch (error) {
                // tratar o erro
            }
            if (isNaN(productQuantity[i])) {
                error = true; // Define erro como true se a quantidade não for válida
            }
        }

        // Retorna falso se houver erro de quantidade inválida, caso contrário, retorna true
        if (error) {
            MessageLogger.logMessage('Quantidade inválida');
            return 'Quantidade inválida';
        } else {
            return true;
        }
    }

    // Verifica se um código de item é válido
    static itemCodeChecker(cod) {
        const codArray = Pedidos.CARDAPIO.map(item => item.cod);
        // Verifica se o código está presente no array de códigos do cardápio
        const codeChecked = codArray.includes(cod);
        if (!codeChecked) {
            MessageLogger.logMessage('Item inválido!');
            return 'Item inválido!';
        }
        return true;
    }
}
