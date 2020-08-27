import React, { useEffect } from 'react';
import Product from './../Products/Product';
import { dataProducts } from './../Products/data';
import NotFoundPage from './../Routes/NotFoundPage';
import { setPageTitle } from './index';

const settings = {
    path: "/product/:link",
};

function Page({ match: { url } }) {
    const product = dataProducts.find((p) => p.link === url);
    const name = product !== undefined ? product.name : '';

    useEffect(() => setPageTitle(name), [name]);

    if (product === undefined) return (<NotFoundPage />);

    return (
        <section className='py-5 bg-white'>
            <div className="container">
                <Product product={product} />
            </div>
        </section>
    );
};


const ProductPage = {
    settings,
    page: Page
};

export default ProductPage;