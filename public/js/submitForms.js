import axios from 'axios';

export const renderProfile = async () => {
  const res = await axios({
    method: 'GET',
    url: 'http://127.0.0.1:3000/profile',
  });
  console.log(res.data);
};
