import React from 'react';
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
import Header from './../Header';
import Footer from './../Footer';
import { Routes } from './../Routes';
import NotFoundPage from './../Routes/NotFoundPage';
import 'react-toastify/dist/ReactToastify.css';
import { toast, Slide } from 'react-toastify';
import './App.scss';
import { TransitionGroup, CSSTransition } from "react-transition-group";

toast.configure({
    position: toast.POSITION.BOTTOM_RIGHT,
    transition: Slide,
    hideProgressBar: true,
    closeOnClick: false,
    autoClose: 5000,
});


function App() {
    return (
        <div id='App-content'>
            {/* should have been BrowserRouter, but github doesn't allow subpages like on localhost */}
            <HashRouter>
                <Header />
                <main className='main-content flex flex-fill'>
                    <Route render={({ location }) => {
                        window.scrollTo(0, 0);
                        return (
                            <TransitionGroup>
                                {/* location.key */}
                                <CSSTransition key={location.pathname} classNames="fade_blur" timeout={500}>
                                    <Switch location={location}>
                                        {Routes.map((route, index) => {
                                        return(
                                            <Route
                                                key={index}
                                                {...route.settings}
                                                component={route.page}
                                            />
                                        )})}
                                        <Route component={NotFoundPage} />
                                    </Switch>
                                </CSSTransition>
                            </TransitionGroup>
                        )
                    }} />
                </main>
                <Footer />
            </HashRouter>
        </div>
    );
}

export default App;
