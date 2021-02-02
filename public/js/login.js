import axios from 'axios';

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
      window.alert('OTP sent successfully.');
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const login = async (otp, email) => {
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
      window.alert('Logged In Successfully!');

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
    }
  } catch (err) {
    console.log(err);
  }
};
