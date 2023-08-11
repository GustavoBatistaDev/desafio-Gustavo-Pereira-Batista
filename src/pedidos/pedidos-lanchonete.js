export class Pedidos {

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

    static validateExtraItemWithMainItem(itens) {
        const itemsWithoutQuantity = [];

        for (let i = 0; i < itens.length; i++) {
            itemsWithoutQuantity.push(itens[i].split(',')[0]);
        }
        if (
            itemsWithoutQuantity.includes(Pedidos.CARDAPIO[1].cod) &&
            !itemsWithoutQuantity.includes(Pedidos.CARDAPIO[0].cod)
        ) {
            console.log('Item extra não pode ser pedido sem o principal');
            return false;
        }
        if (
            itemsWithoutQuantity.includes(Pedidos.CARDAPIO[4].cod) &&
            !itemsWithoutQuantity.includes(Pedidos.CARDAPIO[3].cod)
        ) {
            console.log('Item extra não pode ser pedido sem o principal');
            return false;
        }

        if()


    }
}