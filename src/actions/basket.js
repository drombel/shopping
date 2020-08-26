export const addToBasket = ({id = 0, amount = 1}) => {
    return {
        type: 'BASKET_ADD_ITEM',
        payload: { id, amount },
    };
};

export const removeFromBasket = ({id = 0}) => {
    return {
        type: 'BASKET_REMOVE_ITEM',
        payload: { id },
    };
};

export const updateBasketItem = ({id = 0, amount = 1}) => {
    return {
        type: 'BASKET_UPDATE_ITEM',
        payload: { id, amount },
    };
};

export const removeAllFromBasket = () => {
    return {
        type: 'BASKET_REMOVE_ALL_ITEMS',
        payload: {},
    };
};