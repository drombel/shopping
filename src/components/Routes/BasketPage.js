import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Basket from './../Basket/Basket';
import { Link } from 'react-router-dom';
import { setPageTitle } from './index';

function Title(){
    const basket = useSelector(state => state.basket);
    const basketDesc = (basket.items.length >= 0) ? <span>{basket.items.length}</span> : null;
    return(<>Basket {basketDesc}</>);
};

const settings = {
    path: "/basket",
    // exact: true, // commented because blocked active class on menu item
    title: Title,
};

function Page() {
    const basket = useSelector(state => state.basket);

    useEffect(() => setPageTitle(`Basket ${basket.items.length}`), [basket.items.length]);

    return(
        <section className='py-5 bg-white'>
            <div className="container">
               <h3 className='mb-3'>Basket</h3>
                <Basket />
                {basket.items.length > 0 && 
                <div className='row no-gutters'>
                    <div className="input-group justify-content-end">
                        <Link to='/basket/payment' className="btn btn-success font-weight-bold shadow px-4  col-12 col-sm-auto">Pay</Link>
                    </div>
                </div>
                }
            </div>
        </section>
    );
}

const BasketPage = {
    settings,
    page: Page,
};

export default BasketPage;