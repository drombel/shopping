import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToBasket } from './../../actions/basket';
import { useDispatch } from 'react-redux'
import PropTypes from "prop-types";
import './Product.scss';

function Product(props) {
    const { product } = props;

    const dispatch = useDispatch();
    const [amount, setAmount] = useState(1);

    const roundUpInt = (number) => Math.max(parseInt(number, 10) || 1, 1);
    const total = (product.price * amount).toFixed(2);

    const onClickAdd = () => setAmount(prevAmount => roundUpInt(prevAmount + 1));
    const onClickSubtract = () => setAmount(prevAmount => roundUpInt(prevAmount - 1));
    const onChangeSet = ({target: {value}}) => setAmount(roundUpInt(value));
    const onClickAddToBasket = () => dispatch(addToBasket({ id: product.id, amount }));

    return (
        <div className="product__container row">
            <div className="col-12 col-md-5 mb-2">
                <img src={product.image.full} srcSet={`
                    ${product.image.full} 500w
                    ${product.image.screen ? `, ${product.image.screen} 400w` : ''}
                    ${product.image.laptop ? `, ${product.image.laptop} 350w` : ''}
                    ${product.image.tablet ? `, ${product.image.tablet} 300w` : ''}
                    ${product.image.mobile ? `, ${product.image.mobile} 250w` : ''}
                `} alt={product.name} className="product__img img-fluid shadow-sm rounded mb-2" />
            </div>
            <div className="col-12 col-md-7">
                <h2 className="product__title">{product.name}</h2>
                <hr />
                <p>
                    Category: <Link to={`/products?category[]=${product.category}`} className='font-weight-bold'>{product.category}</Link>,
                    Price: <span className='font-weight-bold'>{product.price} €</span>
                </p>
                <hr />
                <p>{product.content}</p>
                <hr />
                <div className="my-2 product__add-to-cart">
                    <div className='product__add-to-cart__buttons d-flex justify-content-center justify-content-md-start'>
                        <div className=" input-group">
                            <button className='input-group-text product__add-to-cart__buttons__minus' onClick={onClickSubtract}>-</button>
                            <input className='form-control product__add-to-cart__buttons__input' type="text" onChange={onChangeSet} value={amount} />
                            <button className='input-group-text product__add-to-cart__buttons__plus' onClick={onClickAdd}>+</button>
                            <button className='input-group-text product__add-to-cart__buttons__add' onClick={onClickAddToBasket}>Add to Basket</button>
                            <p className="product__add-to-cart__price">{total} €</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const Product_propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.shape({
            full: PropTypes.string.isRequired,
        }).isRequired,
        category: PropTypes.string.isRequired,
    }),
};
Product.propTypes = Product_propTypes;

export default Product;





