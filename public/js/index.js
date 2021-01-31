/* eslint-disable */
import '@babel/polyfill';
import { sendOTP, login } from './login';
import { renderProfile } from './submitForms';

// DOM ELEMENTS
const sendOTPBtn = document.querySelector('.send__otp');
const loginBtn = document.querySelector('.submit__login');
const loginLabel = document.querySelector('.login__label');
const loginInput = document.querySelector('.login__input');
const otpLabel = document.querySelector('.otp__label');
const otpInput = document.querySelector('.otp__input');

const loginPage = document.querySelector('.login__page');
const navBar = document.querySelector('.navbar');

const profileBtn = document.querySelector('.nav__btn--1');

if (loginPage) {
  navBar.classList.add('hidden');
}

if (profileBtn) {
  profileBtn.addEventListener('click', (e) => {
    renderProfile();
  });
}

if (sendOTPBtn) {
  sendOTPBtn.addEventListener('click', (e) => {
    console.log('sfsnfskjn');
    e.preventDefault();
    const email = document.getElementById('email').value;
    sendOTP(email);

    sendOTPBtn.classList.add('hidden');
    loginLabel.classList.add('hidden');
    loginInput.classList.add('hidden');

    loginBtn.classList.remove('hidden');
    otpLabel.classList.remove('hidden');
    otpInput.classList.remove('hidden');
  });
}

if (loginBtn) {
  loginBtn.addEventListener('click', (e) => {
    console.log('abcdefghijklmnopqrstuvwxyz');
    e.preventDefault();
    const otp = document.querySelector('.otp__input').value;
    const email = document.getElementById('email').value;
    login(otp, email);
  });
}
