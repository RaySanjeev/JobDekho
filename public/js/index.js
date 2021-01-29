/* eslint-disable */
import '@babel/polyfill';
import {login} from './login';

// DOM ELEMENTS
const loginbtn = document.querySelector('.login__btn');

if(loginbtn) {
    
    loginbtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        login(email);
    })
}