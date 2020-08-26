import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBasket, updateBasketItem } from './../../actions/basket';
import { Link } from 'react-router-dom';

function Basket() {
    const basket = useSelector(state => state.basket);
    
    return (
        <div>
            <div className='table-responsive-md'>
                <table className="table table-hover table-striped shadow-sm rounded">
                    <thead>
                        <tr>
                            <th className='d-none d-md-flex'>
                                <div className='col-5'>Name</div>
                                <div className='col-7 d-flex p-0 flex-column flex-md-row'>
                                    <div className='col-12 col-md-6 text-md-center'>Amount</div>
                                    <div className='col-12 col-md-3 text-md-center'>Price</div>
                                    <div className='col-12 col-md-3 text-md-right'>Action</div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {basket.items.length === 0 &&
                            <tr>
                                <td><pre className='h4 text-center'>Basket is empty</pre></td>
                            </tr>
                        }
                        {basket.items.map((item, index) => <BasketItem item={item} index={index} key={index} />)}
                        {basket.items.length > 0 &&
                            <tr>
                                <td className='d-flex'>
                                    <div className='col-5 font-weight-bold'>Total</div>
                                    <div className='col-7 d-flex p-0 flex-column flex-md-row'>
                                        <div className='d-none d-md-block col-md-6 text-md-center'></div>
                                        <div className='col-12 col-md-3 text-right text-sm-left text-md-center font-weight-bold'>{basket.price_total} €</div>
                                        <div className='d-none d-md-block col-md-3'></div>
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

    function BasketItem({ item, index }) {
        const dispatch = useDispatch();
        const [amount, setAmount] = useState(item.amount);
        const prevAmount = useRef({ amount }); // remebers previous value of choosen variable
        const roundUpInt = (number) => Math.max(parseInt(number, 10) || 1, 1);
        const delay = useRef(null);
        const { product } = item;

        useEffect(() => {
            clearTimeout(delay.current);
            if (prevAmount.current.amount !== amount) // executes disptach only when amounts changes (won't trigger at the begging)
                delay.current = setTimeout(() => dispatch(updateBasketItem({ id: index, amount })), 300);
            prevAmount.current.amount = amount;

        }, [amount, index, dispatch]);

        const onClickAdd = () => setAmount(value => roundUpInt(value + 1));
        const onClickSubtract = () => setAmount(value => roundUpInt(value - 1));
        const onUpdateSet = ({ target: { value } }) => setAmount(roundUpInt(value));
        const onClickRemove = () => dispatch(removeFromBasket(index));

        return (
            <tr>
                <td className='d-flex flex-wrap'>
                    <div className='col-12 col-sm-5 mb-2 mb-sm-0 px-0 px-sm-3'>
                        <Link to={product.link} className='text-black font-weight-bold d-block'>
                            <img src={product.image.full} alt={product.title} className='img-fluid mb-2 rounded shadow-sm'/>
                            {product.name}
                        </Link>
                    </div>
                    <div className='col-12 col-sm-7 d-flex p-0 d-flex flex-wrap align-items-center'>
                        <div className='col-12 col-md-6 mb-3 mb-md-0'>
                            <div className='input-group justify-content-center'>
                                <div className="input-group-prepend">
                                    <button onClick={onClickSubtract} className='btn btn-secondary font-weight-bold'>-</button>
                                </div>
                                <input type="text" className='text-center' style={{ width: '60px', textAlign: 'center' }}
                                    onBlur={onUpdateSet} onChange={onUpdateSet} value={amount} />
                                <div className="input-group-append">
                                    <button onClick={onClickAdd} className='btn btn-secondary font-weight-bold'>+</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-6 col-md-3 justify-content-md-center font-weight-bold d-flex align-items-center flex-wrap'><span className='d-inline d-md-none'>Price:&nbsp;</span>{item.subtotal} €</div>
                        <div className='col-6 col-md-3 d-flex justify-content-end'>
                            <button className="btn btn-sm btn-danger font-weight-normal" onClick={onClickRemove}>Remove</button>
                        </div>
                    </div>

                </td>
            </tr>
        );
    }
};

export default Basket;