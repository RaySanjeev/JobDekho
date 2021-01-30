import axios from 'axios';

export const sendOTP = async (email) => {
  console.log('bakjfskb');
  const res = await axios({
    method: 'POST',
    url: 'http://127.0.0.1:3000/api/v1/users/sendOTP',
    data: {
      email,
    },
  });

  // window.location.assign('http://127.0.0.1:3000/login')
};

export const login = async (otp, email) => {
  console.log('afkjafhafajhhjlhfa');
  const res = await axios({
    method: 'POST',
    url: 'http://127.0.0.1:3000/api/v1/users/login',
    data: {
      otp,
      email,
    },
  });

  console.log(res);
};
