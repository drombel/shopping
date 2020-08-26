import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { setPageTitle } from './index';

const settings = {
    exact: true,
    path: "/basket/complete",
};

function Page(props) {
    const { complete } = props.location.state ?? false;

    useEffect(() => setPageTitle('Purchase is complete'), []);

    if (!complete) return (<NotFoundPage />);

    return (
        <section className='py-5 bg-white'>
            <div className="container">
                <div className='no-gutters'>
                    <div className="col-12">
                        <pre className='h2 text-wrap'>Purchase is complete!</pre>
                        <pre className='text-wrap'>
                            <p className='text-lg'>Thanks for using our services, you should get email with details of your order. Click <Link to='/' className='font-weight-bold'>here</Link> to return to main page.</p>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}

const BasketCompletePage = {
    settings,
    page: Page,
};

export default BasketCompletePage;