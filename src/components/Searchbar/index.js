import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";
import { dataProducts } from './../Products/data';
import './Searchbar.scss';
import searchImg from './../../assets/search.svg';

function Searchbar() {
    const [result, setResult] = useState([]);
    const [value, setValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const timerValue = useRef(null);
    const timerDisplay = useRef(null);
    const history = useHistory();

    const onChange = e => setValue(e.target.value);
    const onFocus = e => {
        setShowResults(value.length >= 3);
        clearTimeout(timerDisplay.current);
    };
    const onBlur = e => {
        clearTimeout(timerDisplay.current);
        timerDisplay.current = setTimeout(() => setShowResults(false), 100);
    };

    const onClickLink = e => {
        setShowResults(false);
        setValue('');
    };
    const onSubmit = e => {
        e.preventDefault();

        const query = (value !== '') ? new URLSearchParams(new FormData(e.target)).toString() : '';
        history.push({ pathname: '/products', search: `?${query}` });

        setValue('');
        return false;
    }

    useEffect(() => {
        clearTimeout(timerValue.current);
        timerValue.current = setTimeout(() => {
            const newValue = value.toLocaleLowerCase();
            const res = newValue === '' ? [] : dataProducts.filter(p => p.name.toLocaleLowerCase().includes(newValue)).slice(0, 5);
            setResult(res);
        }, 400);
    }, [value]);

    useEffect(() => {
        setShowResults(status => value.length >= 3 ? true : status);
    }, [result, value.length]);

    const renderResults = products => {
        if (products.length === 0) return (<div className='p-2 bg-white rounded-bottom shadow-sm'>No results.</div>);
        return (
            <ul className='list-unstyled bg-white rounded-bottom shadow-sm'>
                {result.map((product, ind) => {
                    return (<li key={ind}>
                        <Link to={product.link} onClick={onClickLink} className='text-decoration-none p-2 py-1 d-block'><span>{product.name}</span></Link>
                    </li>)
                })}
            </ul>
        );
    }

    return (
        <div className="Searchbar mx-3 position-relative" >
            <form action="/products/" onBlur={onBlur} onFocus={onFocus} onSubmit={onSubmit}>
                <div className='input-group rounded'>
                    <input type="text"
                        placeholder="What are You looking for?"
                        onChange={onChange}
                        className='form-control'
                        name='name'
                        autoComplete="off"
                        value={value}
                    />
                    <div className="input-group-append Searchbar__button__container">
                        <label htmlFor='Searchbar__button' className="input-group-text btn-secondary rounded-right"><img src={searchImg} className='img-fluid' alt='Search'/></label>
                        <input type='submit' id='Searchbar__button' className="d-none" value='search' />
                    </div>
                </div>
                <div className="Searchbar__results position-absolute w-100" style={{ 'display': (showResults ? 'block' : 'none') }}>
                    {renderResults(result)}
                </div>
            </form>
        </div>
    );
}

export default Searchbar;