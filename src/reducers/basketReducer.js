import { dataProducts } from './../components/Products/data';
import { toast } from 'react-toastify';

const updateBasketTotalPrice = items => { return (items.reduce((acc, curr) => (acc + parseFloat(curr.subtotal)), 0)).toFixed(2); }

const initial_state = { items: [], price_total: 0};

const basketReducer = (state = initial_state, action) => {
    let amount, items, product;
    
    switch(action.type){
        case "BASKET_ADD_ITEM":
            amount = Math.max(parseInt(action.payload.amount, 10) ?? 1, 1);
            product = dataProducts.find( p => p.id === action.payload.id);

            if (product === undefined) return state;
            items = [...state.items, {product, amount, subtotal: (product.price * amount).toFixed(2)}];

            toast.success(`Added ${amount} of '${product.name}' to basket`);
            
            return {...state, items, price_total: updateBasketTotalPrice(items)};
        case "BASKET_UPDATE_ITEM":
            amount = Math.max(parseInt(action.payload.amount, 10) ?? 1, 1);
            let item = state.items[action.payload.id];

            if (item === undefined || item.amount === amount) return state;
            item.amount = amount;
            item.subtotal = (item.product.price * item.amount).toFixed(2);
            state.items[action.payload.id] = item
            items = [...state.items];

            toast.info(`Changed amount of '${item.product.name}' to ${item.amount}`);

            return {...state, items, price_total: updateBasketTotalPrice(items)};
        case "BASKET_REMOVE_ITEM":
            items = state.items.filter((ele, ind) => ind !== action.payload.id );

            toast.success(`Item has been removed from basket`);
            return {...state, items, price_total: updateBasketTotalPrice(items)};
        case "BASKET_REMOVE_ALL_ITEMS":
            return {...initial_state};
        default:
            return state;
    }
};

export default basketReducer;