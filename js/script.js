require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';


import tabs from './modules/tabs';    
import timer from './modules/timer';     
import modal from './modules/modal';    
import calc from './modules/calc';    
import cards from './modules/cards';     
import data from './modules/data';    
import slider from './modules/slider';     
import {openModal} from './modules/modal'; 

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2022-10-10');
    modal('[data-modal]', '.modal', modalTimerId);
    calc();
    cards();
    data('form', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner'
    });

});



