import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.scss';
import { addToBasket } from './../../actions/basket';
import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import { Product_propTypes } from './Product';

function ProductList(props) {
    // dodać validację propTypes
    const { products } = props;
    const dispatch = useDispatch();
    const cols = props.cols > 0 ? props.cols : 4; 

    if(Array.isArray(products) === false || products.length === 0)
        return(<div className='h-100 d-flex justify-content-center align-items-center'><pre className='h4 text-wrap'>Products not found :(</pre></div>);
    return(
        <div className="productList__container" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {products.map((product, index) => (
                <div className="productList__item bg-white rounded overflow-hidden d-flex flex-column" key={index}>
                    <Link to={product.link}><img src={product.image.full} alt={product.name} /></Link>
                    <div className='productList__item__desc flex-fill d-flex flex-column'>
                        <div className='row no-gutters align-items-stretch flex-fill'>
                            <Link to={product.link} className='title h4 col-12 col-sm-8 p-2 text-decoration-none text-dark text-truncate mb-0'>{product.name}</Link>
                            <span className='price col-12 col-sm-4 p-2 d-flex align-items-center justify-content-center text-dark'>{product.price} €</span>
                        </div>
                        <button className='button' onClick={() => dispatch(addToBasket({ id: product.id }))}>Add</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

ProductList.propTypes = {
    products: PropTypes.arrayOf(Product_propTypes.product),
};

export default ProductList;