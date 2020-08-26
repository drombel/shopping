import React, { useEffect } from 'react';
import { setPageTitle } from './index';

function NotFoundPage(){
    useEffect(() => setPageTitle('Error 404'), []);

    return(
        <section className='py-5 bg-white'>
            <div className="container d-flex align-items-center">
                <div className=" row justify-content-center flex-column">
                    <pre className='h1 text-wrap'>Error 404</pre>
                    <pre className='h2 text-wrap'>Sorry, but we couldn't find what you have been looking for :(</pre>
                </div>
            </div>
        </section>
    );
};

export default NotFoundPage;