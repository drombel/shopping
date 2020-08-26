import React, { useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { Link } from 'react-router-dom';
import mountainsImg from './../../assets/mountains.jpg';
import aboutCompanyImg from './../../assets/about-company.jpg';
import './MainPage.scss';
import ProductList from './../Products/ProductList';
import { dataProducts } from './../Products/data';
import { setPageTitle } from './index';

const settings = {
    path: "/",
    exact: true,
    title: () => 'Main page',
};

function Page() {
    useEffect(() => setPageTitle(), []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 3000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        customPaging: i => (<div />)
    };

    function Slide(props) {
        const { to, title, subtitle, button, img } = props;
        return (
            <div className='slide'>
                <div className='slide__wrapper'>
                    <div className='slide__container d-flex flex-column align-items-start justify-content-center'>
                        {title && <Link to={to} className="title">{title}</Link>}
                        {subtitle && <Link to={to} className="subtitle">{subtitle}</Link>}
                        {button && <Link to={to} className="button btn btn-primary">{button}</Link>}
                    </div>
                </div>
                <img src={img} alt={title} />
            </div>
        );
    };
    
    return (
        <div>
            <section>
                <Slider className='Banner' {...sliderSettings}>
                    <Slide
                        to="/products"
                        title="Check our newest cloths!"
                        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                        button="Browse"
                        img={mountainsImg}
                    />
                    <Slide
                        to="/contact"
                        title="Contact us!"
                        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, ad!"
                        button="Send an e-mail!"
                        img={mountainsImg}
                    />
                </Slider>
            </section>
            <section className='trending-products py-5'>
                <div className='container'>
                    <h2 className="h1 mb-3 mb-md-4 mb-lg-5 text-center">Trending Products</h2>
                    <div className='trending-products__list mb-4'>
                        <ProductList products={dataProducts.slice(0, 6)} cols={3} />
                    </div>
                    <div className='row no-gutters justify-content-center'>
                        <Link to='/products' className='button btn btn-secondary px-3 py-2'>Show more</Link>
                    </div>
                </div>
            </section>
            <section className='about-company bg-white py-5'>
                <div className='container'>
                    <h2 className='h1  mb-3 mb-md-4 mb-lg-5 text-center'>About Company</h2>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <img src={aboutCompanyImg} alt="About Company" className='img-fluid rounded shadow-sm mb-3 mb-md-0' />
                        </div>
                        <div className="col-12 col-sm-6 d-flex flex-column justify-content-center">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis labore consequatur, animi, id expedita odio.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita non facilis, reiciendis pariatur assumenda totam quae inventore atque voluptatibus fuga.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const MainPage = {
    settings,
    page: Page
};

export default MainPage;