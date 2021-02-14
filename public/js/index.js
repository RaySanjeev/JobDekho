/* eslint-disable */
import '@babel/polyfill';
import { sendOTP, login, logout, signupOTP } from './login';
import { renderProfile, uploadResume, updateResumeField } from './submitForms';
import { getGeoLocation } from './geoLocation';
import { showAlert } from './alert';

// DOM ELEMENTS
const sendOTPBtn = document.querySelector('.send__otp');
const loginBtn = document.querySelector('.submit__login');
const loginLabel = document.querySelector('.login__label');
const loginInput = document.querySelector('.login__input');
const otpLabel = document.querySelector('.otp__label');
const otpInput = document.querySelector('.otp__input');
const updateUser = document.querySelectorAll('.submit__user');

const profileBtn = document.querySelector('.nav__btn--1');
const jobApply = document.querySelectorAll('.job__apply');
const logoutBtn = document.querySelector('.nav__btn--2');
const createJob = document.querySelector('.employer__submit');

const signup = document.querySelector('.signup');
const signupPage = document.querySelector('.signup__page');
const signupSendOtpBtn = document.querySelector('.signup__sendOtp');

const tabButton = document.querySelectorAll('.post__name');
const tabBlock = document.querySelectorAll('.block');
const applicantsPage = document.querySelector('.main__applicants');

const geoLocationBtn = document.querySelector('.geo__jobs');

if (createJob) {
  createJob.textContent = 'CREATING...';
}

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

    loginBtn.textContent = 'LOGING IN...';
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

      el.textContent = 'Submitting...';
      updateResumeField(jobId);
      uploadResume(form);

      const count = el.closest('.list__jobs').childElementCount;
      if (Number(count) === 1) {
        el.closest('.list__jobs').classList.add('slide__right');
        showAlert('error', 'You have applied in all jobs. Try again tomorrow');
      }
      el.closest('.job').classList.add('slide__right');
    });
  });
}

if (geoLocationBtn) {
  geoLocationBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    getGeoLocation();
  });
}

if (applicantsPage) {
  window.addEventListener('load', () => {
    document
      .querySelector(`.candidates__block--0`)
      .classList.remove('hidden', 'visibility');

    tabButton[0].style.backgroundColor = 'rgb(236, 79, 22)';
  });
}

if (tabButton) {
  tabButton.forEach((el) => {
    el.addEventListener('click', () => {
      tabButton.forEach((el) => (el.style.backgroundColor = `transparent`));
      el.style.backgroundColor = 'rgb(236, 79, 22)';
      tabBlock.forEach((el) => {
        el.classList.add('visibility', 'hidden');
      });
      const postNumber = el.closest('.post').dataset.postNumber;
      document
        .querySelector(`.candidates__block--${postNumber}`)
        .classList.remove('visibility', 'hidden');
    });
  });
}

if (signup) {
  signupSendOtpBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;

    const res = await signupOTP(email, name, role);
    if (res.status === 200) {
      signupPage.innerHTML = '';
      const html = res.data;
      signupPage.insertAdjacentHTML('afterbegin', html);
    }
  });
}

document.addEventListener('click', function (e) {
  if (e.target && e.target.id === 'verify__gmail') {
    const otp = document.querySelector('.verify__input').value;
    const email = document.querySelector('.para__email').textContent;
    login(otp, email);
  }
});

if (updateUser) {
  updateUser.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      el.textContent = 'Updating...';
    });
  });
}
