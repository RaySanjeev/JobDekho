import axios from 'axios';
import { showAlert } from './alert';

export const sendOTP = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/sendOTP',
      data: {
        email,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'OTP sent successfully');
    }
  } catch (err) {
    window.alert(err.response.data.message);
  }
};

export const signupOTP = async (email, name, role) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signupOTP',
      data: {
        email,
        role,
        name,
        signup: true,
      },
    });
    return res;
  } catch (err) {
    console.log(err.response);
  }
};

export const login = async (otp, email) => {
  console.log('sfsndfkj');
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        otp,
        email,
      },
    });
    console.log(res.data.data.user.role);
    if (res.data.status === 'success') {
      showAlert('success', 'Logged In Successfully');

      if (res.data.data.user.role === 'user') {
        window.location.assign('/userDashboard');
      } else {
        window.location.assign('/employerDashboard');
      }
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      window.location.assign('/login');
      showAlert('success', 'Logged Out Successfully');
    }
  } catch (err) {
    console.log(err);
  }
};
