import MainPage from './MainPage';
import ProductsPage from './ProductsPage';
import ProductPage from './ProductPage';
import ContactPage from './ContactPage';
import BasketPage from './BasketPage';
import BasketPaymentPage from './BasketPaymentPage';
import BasketCompletePage from './BasketCompletePage';

export const Routes = [
    {
        settings: MainPage.settings,
        page: MainPage.page,
    },
    {
        settings: ProductsPage.settings,
        page: ProductsPage.page,
    },
    {
        settings: ContactPage.settings,
        page: ContactPage.page,
    },
    {
        settings: BasketCompletePage.settings,
        page: BasketCompletePage.page,
    },
    {
        settings: BasketPaymentPage.settings,
        page: BasketPaymentPage.page,
    },
    {
        settings: BasketPage.settings,
        page: BasketPage.page,
    },
    {
        settings: ProductPage.settings,
        page: ProductPage.page,
    },
];

export const setPageTitle = (title = '') => {
    const pageBaseName = 'Shopping';
    title = title !== '' ? (' - ' + title) : title; 
    document.title = pageBaseName + title;
}