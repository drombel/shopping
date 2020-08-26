import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateUserInfo } from './../../actions/user';
import { removeAllFromBasket } from './../../actions/basket';
import { Redirect, useHistory } from 'react-router-dom';
import { setPageTitle } from './index';

const settings = {
    exact: true,
    path: "/basket/payment",
};

function Page() {
    const basket = useSelector(state => state.basket);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    // on submit save data to redux for later use
    const initialFields = ['name', 'surname', 'email', 'address', 'phone'];
    const [data, setData] = useState(initialFields.reduce((acc, val) => { acc[val] = user[val] || ''; return { ...acc }; }, {}));
    const [errors, setErrors] = useState(initialFields.reduce((acc, val) => { acc[val] = ''; return { ...acc }; }, {}));
    const [touched, setTouched] = useState(initialFields.reduce((acc, val) => { acc[val] = false; return { ...acc }; }, {}));
    const valid = useRef(false);

    useEffect(() => setPageTitle('Basket payment'), []);

    if (basket.items.length === 0 && !valid.current) return <Redirect to='/basket' />;

    const onChange = e => {
        const { name, value } = e.target
        let newData = data;
        newData[name] = value;

        let newErrors = errors;
        let newTouched = touched;

        newTouched[name] |= value !== '';
        newErrors[name] = (newTouched[name] && value === '') ? 'This field is required.' : '';
        newErrors[name] = (newTouched[name] && name === 'email' && !/\S+@\S+/.test(value)) ? 'This is not a correct email address. ex: example@domain.com' : newErrors[name];
        newErrors[name] = (newTouched[name] && name === 'phone' && !/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/.test(value)) ? 'This is not a correct phone number. ex: +48 123-456-798 ' : newErrors[name];

        setTouched({ ...newTouched });
        setErrors({ ...newErrors });
        setData({ ...newData });
    };

    const onSubmit = e => {
        e.preventDefault();

        // final check
        valid.current = initialFields.every(field => data[field] !== '' && errors[field] === '');
        if (valid.current) {
            dispatch(updateUserInfo({ user: data }));
            dispatch(removeAllFromBasket());
            history.push({
                pathname: '/basket/complete',
                state: { complete: valid.current }
            });
        } else {
            alert('Your data is invalid.');
        }

        return false;
    }

    return (
        <section className='py-5 bg-white'>
            <div className="container">
                <div className='no-gutters'>
                    <div className="col-12">
                        <form onSubmit={onSubmit} method='POST'>
                            <div className="bg-light rounded shadow-sm p-3">
                                <div className="h3">Payment form</div>
                                <div className="row">
                                    <hr className='w-100' />
                                    <div className="col-12 no-gutters d-md-flex align-items-stretch">
                                        <div className='input-group col-12 col-md-6 col-lg-4 mr-md-2'>

                                            <div className="input-group-prepend">
                                                <label className="input-group-text w-100 justify-content-end" htmlFor='name'>Name</label>
                                            </div>
                                            <input type="text" name="name" id="name" className='form-control col-auto' value={data.name} onChange={onChange} required />
                                        </div>
                                        {errors.name && <div className="invalid-feedback d-flex align-items-center">{errors.name}</div>}
                                    </div>
                                    <hr className='w-100' />
                                    <div className="col-12 no-gutters d-md-flex align-items-stretch">
                                        <div className='input-group col-12 col-md-6 col-lg-4 mr-md-2'>

                                            <div className="input-group-prepend">
                                                <label className="input-group-text w-100 justify-content-end" htmlFor='surname'>Surname</label>
                                            </div>
                                            <input type="text" name="surname" id="surname" className='form-control col-auto' value={data.surname} onChange={onChange} required />
                                        </div>
                                        {errors.surname && <div className="invalid-feedback d-flex align-items-center">{errors.surname}</div>}
                                    </div>
                                    <hr className='w-100' />
                                    <div className="col-12 no-gutters d-md-flex align-items-stretch">
                                        <div className='input-group col-12 col-md-6 col-lg-4 mr-md-2'>

                                            <div className="input-group-prepend">
                                                <label className="input-group-text w-100 justify-content-end" htmlFor='email'>Email</label>
                                            </div>
                                            <input type="email" name="email" id="email" className='form-control col-auto' value={data.email} onChange={onChange} required />
                                        </div>
                                        {errors.email && <div className="invalid-feedback d-flex align-items-center">{errors.email}</div>}
                                    </div>
                                    <hr className='w-100' />
                                    <div className="col-12 no-gutters d-md-flex align-items-stretch">
                                        <div className='input-group col-12 col-md-6 col-lg-4 mr-md-2'>

                                            <div className="input-group-prepend">
                                                <label className="input-group-text w-100 justify-content-end" htmlFor='address'>Address</label>
                                            </div>
                                            <input type="text" name="address" id="address" className='form-control col-auto' value={data.address} onChange={onChange} required />
                                        </div>
                                        {errors.address && <div className="invalid-feedback d-flex align-items-center">{errors.address}</div>}
                                    </div>
                                    <hr className='w-100' />
                                    <div className="col-12 no-gutters d-md-flex align-items-stretch">
                                        <div className='input-group col-12 col-md-6 col-lg-4 mr-md-2'>

                                            <div className="input-group-prepend">
                                                <label className="input-group-text w-100 justify-content-end" htmlFor='phone'>Phone</label>
                                            </div>
                                            <input type="telephone" name="phone" id="phone" className='form-control col-auto' value={data.phone} onChange={onChange} required />
                                        </div>
                                        {errors.phone && <div className="invalid-feedback d-flex align-items-center">{errors.phone}</div>}
                                    </div>

                                    <div className="input-group col-12 justify-content-center mt-2">
                                        <div className="col-12 col-md-2 px-0 mt-2">
                                            <input type='submit' className='form-control btn btn-primary font-weight-normal' value='Send' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

const BasketPaymentPage = {
    settings,
    page: Page,
};

export default BasketPaymentPage;