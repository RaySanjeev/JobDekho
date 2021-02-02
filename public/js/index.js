/* eslint-disable */
import '@babel/polyfill';
import { sendOTP, login, logout } from './login';
import { renderProfile, uploadResume, updateResumeField } from './submitForms';
import { getGeoLocation } from './geoLocation';

// DOM ELEMENTS
const sendOTPBtn = document.querySelector('.send__otp');
const loginBtn = document.querySelector('.submit__login');
const loginLabel = document.querySelector('.login__label');
const loginInput = document.querySelector('.login__input');
const otpLabel = document.querySelector('.otp__label');
const otpInput = document.querySelector('.otp__input');

const profileBtn = document.querySelector('.nav__btn--1');
const jobApply = document.querySelectorAll('.job__apply');
const logoutBtn = document.querySelector('.nav__btn--2');

const geoLocationBtn = document.querySelector('.geo__jobs');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    logout();
  });
}

if (profileBtn) {
  profileBtn.addEventListener('click', (e) => {
    renderProfile();
  });
}

if (sendOTPBtn) {
  sendOTPBtn.addEventListener('click', (e) => {
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
    e.preventDefault();
    const otp = document.querySelector('.otp__input').value;
    const email = document.getElementById('email').value;
    login(otp, email);
  });
}

if (jobApply) {
  jobApply.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const form = new FormData();
      const { jobId } = el.closest('.job').dataset;

      if (!el.closest('.upload').firstChild.lastChild.files[0]) {
        return alert('upload resume file first to apply');
      }
      form.append(
        'resume',
        el.closest('.upload').firstChild.lastChild.files[0]
      );

      updateResumeField(jobId);
      uploadResume(form);

      const count = el.closest('.list__jobs').childElementCount;
      console.log(count);
      if (Number(count) === 1) {
        el.closest('.list__jobs').classList.add('slide__right');
        window.alert('You have applied in all jobs. Try again tomorrow');
      }
      el.closest('.job').classList.add('slide__right');
    });
  });
}

// if (geoLocationBtn) {
//   geoLocationBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     getGeoLocation();
//   });
// }
