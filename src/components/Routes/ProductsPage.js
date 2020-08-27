import React, { useState, useEffect, useRef } from 'react';
import ProductList from './../Products/ProductList';
import { dataProducts, categories } from './../Products/data';
import { useLocation, useHistory } from 'react-router-dom';
import './ProductsPage.scss';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import uuid from 'uuid';
import { setPageTitle } from './index';

const settings = {
    path: "/products",
    title: () => 'Products',
};

function Page() {
    const [products, setProducts] = useState([]);
    
    useEffect(() => setPageTitle('Products'), []);
    
    // all that should be done by ajax
    const orderBy = [
        {id: 1, name: 'Name 🠅', field: 'name', type: 'ASC'},
        {id: 2, name: 'Name 🠇', field: 'name', type: 'DESC'},
        {id: 3, name: 'Price 🠅', field: 'price', type: 'ASC'},
        {id: 4, name: 'Price 🠇', field: 'price', type: 'DESC'},
    ];
    
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    const [name, setName] = useState(params.get('name') ?? '');
    const paramPriceMin = parseInt(params.get('price-min'));
    const [priceMin, setPriceMin] = useState(!isNaN(paramPriceMin) ? paramPriceMin : '');
    const paramPriceMax = parseInt(params.get('price-max'));
    const [priceMax, setPriceMax] = useState(!isNaN(paramPriceMax) ? paramPriceMax : '');
    const [selectedCategories, setSelectedCategories] = useState(params.getAll('category[]') ?? []);
    const orderID = parseInt(params.get('order'));
    const [order, setOrder] = useState(orderBy.find(item => item.id === orderID, orderID) ?? orderBy[0]);
    
    const [searchTimeout, setSearchTimeout] = useState(null); // for little delay
    const isInitialMount = useRef(true); // to avoid empty products case
    const animationKey = useRef(uuid.v4()); // to make animations stable
    const form = useRef(null); // for mobile filter menu activation
    const history = useHistory();

    function getProducts(){
        clearTimeout(searchTimeout);
        let newProducts = dataProducts.filter(product => {
            // in case if all filters were off
            let valid = true;

            if(name.toLocaleLowerCase() !== '')
                valid &= product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
            if(priceMin !== '' && priceMin > 0) 
                valid &= priceMin <= product.price;
            if(priceMax !== '' && priceMax > 0 && priceMax >= priceMin) 
                valid &= priceMax >= product.price;
            if(selectedCategories.length !== 0)
                valid &= selectedCategories.includes(product.category);
            return valid;
        });

        if(order.field === 'name')
            newProducts = newProducts.sort((prod1, prod2) => prod1.name.localeCompare(prod2.name));
        if(order.field === 'price')
            newProducts = newProducts.sort((prod1, prod2) => prod1.price - prod2.price);
        if(order.type === 'DESC')
            newProducts = newProducts.reverse();

        animationKey.current = uuid.v4();
        setProducts(newProducts);
    }
    
    // componentDidMount 
    // eslint-disable-next-line
    useEffect(() => getProducts(), []);

    // componentOnChange
    useEffect(() => {
        if(isInitialMount.current){
            isInitialMount.current = false;return;
        }
        clearTimeout(searchTimeout);
        setSearchTimeout(setTimeout( () => getProducts(), 300));
        // eslint-disable-next-line
    }, [name, priceMin, priceMax, JSON.stringify(selectedCategories), order]);

    const onChangeName = e => setName(e.target.value);
    const onChangeMinPrice = e => {
        const value = parseInt(e.target.value);
        setPriceMin(!isNaN(value) ? value : '')
    };
    const onChangeMaxPrice = e => {
        const value = parseInt(e.target.value);
        setPriceMax(!isNaN(value) ? value : '')
    };
    const onChangeSelectedCategories = e => {
        const { value } = e.target;
        // this can be executed in single line, but less readable and it's not necessary
        if(selectedCategories.includes(value))
            setSelectedCategories(items => items.filter(it => it !== value));
        else
            setSelectedCategories(items => [...items, value]);
        // setSelectedCategories(items => items.includes(value) ? items.filter(it => it !== value) : [...items, value]);
    };
    const onChangeOrder = e => {
        const id = e.target.value;
        const newOrder = orderBy.find(item => item.id === id, id); 
        setOrder(newOrder ?? orderBy[0]);
    };
    const onSubmitSearch = e => {
        e.preventDefault();
        getProducts();
        const query = new URLSearchParams(new FormData(e.target)).toString();
        history.push({ pathname: '/products', search: `?${query}` });
        form.current.classList.remove('animate');
        form.current.classList.remove('active');
        return false;
    };
    const toggleForm = e => {
        e.preventDefault();
        
        new Promise(resolve => {
            if(form.current.classList.contains('animating')) return;
            form.current.classList.add('animating');
            
            const isVisible = form.current.classList.contains('animate');
            if(isVisible){
                form.current.classList.remove('animate');
                return setTimeout(() => resolve(isVisible), 500);
            }
                
            form.current.classList.add('active');
            resolve(isVisible);

        }).then(isVisible => {
            if(isVisible){
                form.current.classList.remove('animating');
                return form.current.classList.remove('active');
            }

            return setTimeout(() => {
                form.current.classList.add('animate');
                setTimeout(() => form.current.classList.remove('animating'), 500);
            }, 100);
        });
        
        return false;
    };

    return(
        <section className='py-3 py-sm-4 py-lg-5 bg-white'>
            <div className="container">
                <div className="row">
                    <div className='product-searchform col-12 col-md-3 mb-3 p-auto p-md-0'>
                        <button className='btn btn-primary btn-block font-weight-normal w-100 d-block d-md-none' onClick={toggleForm}>Show Filters</button>
                        <form className='bg-light p-3 shadow-sm' ref={form} onSubmit={onSubmitSearch}>
                            <div className="form-group">
                                <div className='h3 mb-2 w-100 d-flex justify-content-between d-md-block'>
                                    Filters 
                                    <button className='btn btn-secondary d-block d-md-none font-weight-normal' onClick={toggleForm}>Close</button>
                                </div>
                                <div className="input-group mb-2">
                                    <input type="text" name="name" id="name" className='form-control' placeholder='name' value={name} onChange={onChangeName}/>
                                </div>
                                <div className='mb-2'>
                                    <div className='h4 mb-2 w-100'>Categories</div>
                                    {categories.map( (cat, id) => (
                                        <div className='form-check' key={id}>
                                            <input className='form-check-input' name="category[]" id={`category-${id}`} type='checkbox' value={cat} 
                                            defaultChecked={selectedCategories.find( item => item === cat, cat )} onChange={onChangeSelectedCategories}
                                            />
                                            <label className='form-check-label' htmlFor={`category-${id}`}>{cat}</label>
                                        </div>
                                    ) )}
                                </div>
                                <div className="input-group mb-2">
                                    <div className='h4 mb-2 w-100'>Price</div>
                                    <div className="input-group-prepend w-50">
                                        <input className='form-control' type="text" name="price-min" id="price-min" placeholder='min' value={priceMin} onChange={onChangeMinPrice}/>
                                    </div>
                                    <div className="input-group-append w-50">
                                        <input className='form-control' type="text" name="price-max" id="price-max" placeholder='max' value={priceMax} onChange={onChangeMaxPrice}/>
                                    </div>
                                </div>
                                <div className="input-group mb-2">
                                    <div className='h4 mb-2 w-100'>Order by</div>
                                    <select className='custom-select' name="order" id="order" value={order.id} onChange={onChangeOrder}>
                                        {orderBy.map( (item, id) => (<option value={item.id} key={id} defaultChecked={order.id === item.id}>{item.name}</option>) )}
                                    </select>
                                </div>
                                <div className="input-group mt-3 mb-2">
                                    <input className='btn btn-primary font-weight-normal btn-block shadow-sm' type="submit" value="Search"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='col-12 col-md-9'>
                        <div className="position-relative">
                            <TransitionGroup>
                                <CSSTransition key={animationKey.current} classNames={!isInitialMount.current ? 'fade' : ''} timeout={500}>
                                    <div>
                                        <ProductList cols={3} products={products} />
                                    </div>
                                </CSSTransition>
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

const ProductsPage = {
    settings,
    page:Page
};

export default ProductsPage;