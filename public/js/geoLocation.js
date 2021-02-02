import axios from 'axios';

const success = async (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);
  const res = await axios({
    method: 'GET',
    url: `http://127.0.0.1:3000/api/v1/jobs/${latitude}/${longitude}`,
  });
  console.log(res.data);
  window.location.assign('/userDashboard');
};

const error = () => {
  window.alert('Unable to retrieve your location.');
};

export const getGeoLocation = async () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
  } else {
    document.querySelector('.geo__jobs').textContent = 'Finding Near Jobs...';
    navigator.geolocation.getCurrentPosition(success, error);
  }
};
