import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer(){

    return(
        <footer className='bg-dark pt-5 pb-3 text-white'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-4">
                        <span className="h3">Fancy Quote</span>
                        <hr/>
                        <p className='font-italic'>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi possimus officia perspiciatis mollitia asperiores dignissimos. Perspiciatis odit, sunt recusandae repudiandae."</p>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <span className="h3">Navigation Menu</span>
                        <hr/>
                        <ul className="list">
                            <li className="list-item"><Link to="#" className="text-white">Menu item 1</Link></li>
                            <li className="list-item"><Link to="#" className="text-white">Menu item 2</Link></li>
                            <li className="list-item"><Link to="#" className="text-white">Menu item 3</Link></li>
                            <li className="list-item"><Link to="#" className="text-white">Menu item 4</Link></li>
                        </ul>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <span className="h3">Shortcuts</span>
                        <hr/>
                        <ul className="list">
                            <li className="list-item"><Link to="#" className="text-white">Menu item 1</Link></li>
                            <li className="list-item"><Link to="#" className="text-white">Menu item 2</Link></li>
                            <li className="list-item"><Link to="#" className="text-white">Menu item 3</Link></li>
                            <li className="list-item"><Link to="#" className="text-white">Menu item 4</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;