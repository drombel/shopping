import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import { Routes } from './../Routes';
import { slide as Menu } from 'react-burger-menu'
import logo from './../../assets/logo.png';
import Searchbar from './../Searchbar';
import './Header.scss';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header id="header" className="w-100 bg-white">
            <div className="container">
                <div className="row align-items-center py-2">
                    <div className="col-8 col-md-3 p-0">
                        <Link to="/" className="header__logo">
                            <img src={logo} alt="Page title" />
                        </Link>
                    </div>
                    <div className="col-4 col-sm d-flex justify-content-end">
                        <nav className="row no-gutters align-items-center justify-content-end d-none d-lg-flex">
                            <div>
                                <Searchbar />
                            </div>
                            <ul className="nav">
                                {Routes.map((route, index) => route.settings.title ? (
                                    <li key={index} className="nav-item">
                                        <NavLink {...route.settings}
                                            title={null}
                                            to={route.settings.path}
                                            className="nav-link"
                                            activeClassName="active">
                                            <route.settings.title />
                                        </NavLink>
                                    </li>
                                ) : null)}
                            </ul>
                        </nav>
                        <button className='btn btn-dark d-lg-none' onClick={e => setIsOpen(true)}>&#9776;</button>
                    </div>
                </div>
            </div>
            <div style={{position: 'absolute', top: 0}} onClick={e => setIsOpen(false)}>
            <Menu isOpen={isOpen} onStateChange={({isOpen}) => setIsOpen(isOpen)}>

                <div id='mobile-menu'>
                    <ul className="list-unstyled flex-column">
                        {Routes.map((route, index) => route.settings.title ? (
                            <li key={index} className="nav-item">
                                <NavLink {...route.settings}
                                    title={null}
                                    to={route.settings.path}
                                    className="nav-link"
                                    activeClassName="active">
                                    <route.settings.title />
                                </NavLink>
                            </li>
                        ) : null)}
                    </ul>
                </div>
                
            </Menu>
            </div>
        </header>
    );
}

export default Header;
