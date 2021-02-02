import axios from 'axios';

export const renderProfile = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/userDashboard/profile',
    });
    window.location.assign('/userDashboard/profile');
  } catch (err) {
    console.log(err.response.data);
  }
};

export const uploadResume = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/uploadResume',
      data,
    });
    console.log(res.data);
    if (res.data.status === 'success') {
      console.log('resume uploaded');
    }
    if (res.data.status === 'fail') {
      console.log(res.data.message);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const updateResumeField = async (jobId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/jobs/addResume',
      data: {
        jobId,
      },
    });
    if (res.data.status === 'success') {
      alert('Congratulations!! successfully applied');
    }
  } catch (err) {
    window.alert(err.response.data.message);
  }
};
