/* eslint-disable */
import '@babel/polyfill';
import {sendOTP, login} from './login';

// DOM ELEMENTS
const sendOTPBtn = document.querySelector('.send__otp');
const loginBtn = document.querySelector('.submit__login')
if(sendOTPBtn) {
    
    sendOTPBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        sendOTP(email);
    })
}

if(loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const otp = document.querySelector('.otp__input').value;
        const email = document.getElementById('email').value;
        login(otp, email);
    })
}
