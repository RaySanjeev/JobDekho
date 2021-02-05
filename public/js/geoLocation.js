import axios from 'axios';
import { showAlert } from './alert';

const success = async (position) => {
  try {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/jobs/${latitude}/${longitude}`,
    });
    if (res.status === 200) {
      // alert('Done!!');
      showAlert('success', 'Done!!');
      const body = document.getElementsByTagName('body')[0];
      body.innerHTML = '';
      body.insertAdjacentHTML('afterbegin', res.data);
      const anchorTag = document.querySelector('.geo__jobs');
      anchorTag.textContent = 'ALL JOBS';
      anchorTag.href = '/userDashboard';
      anchorTag.classList.add('all__jobs');
    }
  } catch (err) {
    console.log(err);
  }
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
