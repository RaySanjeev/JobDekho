import axios from 'axios';

export const sendOTP = async (email) => {
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
};

export const login = async (otp, email) => {
  const res = await axios({
    method: 'POST',
    url: 'http://127.0.0.1:3000/api/v1/users/login',
    data: {
      otp,
      email,
    },
  });

  if (res.data.status === 'success') {
    window.alert('Logged In Successfully!');
    window.location.assign('/userDashboard');
  }
};
