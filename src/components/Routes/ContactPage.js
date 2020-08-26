import React, { useState, useEffect } from 'react';
import contactImg from './../../assets/contact.jpg';
import { setPageTitle } from './index';

const settings = {
    path: "/contact",
    title: () => 'Contact',
};

function Page() {
    const initialFields = ['name', 'surname', 'email', 'content'];
    const [data, setData] = useState(initialFields.reduce((acc, val) => { acc[val] = ''; return { ...acc }; }, {}));
    const [errors, setErrors] = useState(initialFields.reduce((acc, val) => { acc[val] = ''; return { ...acc }; }, {}));
    const [touched, setTouched] = useState(initialFields.reduce((acc, val) => { acc[val] = false; return { ...acc }; }, {}));
    const [answer, setAnswer] = useState('');

    useEffect(() => setPageTitle('Contact'), []);

    const onChange = e => {
        const { name, value } = e.target
        let newData = data;
        newData[name] = value;

        let newErrors = errors;
        let newTouched = touched;

        newTouched[name] |= value !== '';
        newErrors[name] = (newTouched[name] && value === '') ? 'This field is required.' : '';
        newErrors[name] = (newTouched[name] && name === 'email' && !/\S+@\S+/.test(value)) ? 'This is not a correct email address. ex: example@domain.com' : newErrors[name];

        setTouched({ ...newTouched });
        setErrors({ ...newErrors });
        setData({ ...newData });
    };

    const onSubmit = e => {
        // final check
        setAnswer(ans => '');
        let valid = initialFields.every(field => data[field] !== '' && errors[field] === '');
        if (valid) setAnswer(ans => 'Request has been sent.');
        else setAnswer(ans => 'Your data is invalid.');

        //reset
        setData(initialFields.reduce((acc, val) => { acc[val] = ''; return { ...acc }; }, {}));
        setErrors(initialFields.reduce((acc, val) => { acc[val] = ''; return { ...acc }; }, {}));
        setTouched(initialFields.reduce((acc, val) => { acc[val] = false; return { ...acc }; }, {}));
        e.preventDefault();
        return false;
    }

    return (
        <section className='py-5 bg-white'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <img src={contactImg} alt="Contact" className="img-fluid rounded shadow-sm mb-3 mb-md-0" />
                    </div>
                    <div className="col-12 col-md-8">
                        <h2>Contact</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero iure libero molestiae sunt!<br />
                            Culpa voluptatem quam, esse debitis deserunt dolore dicta incidunt mollitia aut dolores rerum aperiam!<br />
                            Quaerat unde porro voluptatem repellendus vel omnis consequuntur doloribus accusamus a? Iusto, tempore.
                        </p>
                        <form onSubmit={onSubmit} method='POST'>
                            <div className="bg-light rounded shadow-sm p-3">
                                <div className="h3 mb-3">Contact form</div>
                                <div className="row">
                                    <div className='col-12 col-md-5 flex-column justify-content-between'>
                                        <div className="input-group mb-3">
                                            <input type="text" name="name" id="name" className='form-control' placeholder='Name' value={data.name} onChange={onChange} required />
                                            {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                                        </div>

                                        <div className="input-group mb-3">
                                            <input type="text" name="surname" id="surname" className='form-control' placeholder='Surname' value={data.surname} onChange={onChange} required />
                                            {errors.surname && <div className="invalid-feedback d-block">{errors.surname}</div>}
                                        </div>

                                        <div className="input-group mb-3 mb-md-0">
                                            <input type="email" name="email" id="email" className='form-control' placeholder='Email' value={data.email} onChange={onChange} required />
                                            {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-7 d-flex flex-column'>
                                        <div className="input-group mb-3 flex-fill">
                                            <textarea name="content" id="content" className='form-control' placeholder='How can we help You?' value={data.content} onChange={onChange} required />
                                            {errors.content && <div className="invalid-feedback d-block">{errors.content}</div>}
                                        </div>

                                        <div className="input-group">
                                            <input type='submit' className='form-control btn btn-primary font-weight-normal' value='Send' />
                                        </div>
                                    </div>
                                </div>
                                {answer &&
                                    <div className='row no-gutters mt-3 p-2 bg-success text-white rounded'>
                                        <div className="col-auto">{answer}</div>
                                    </div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

const ContactPage = {
    settings,
    page: Page,
};

export default ContactPage;