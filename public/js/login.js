import axios from 'axios';

export const login = async(email) => {
    console.log('bakjfskb')
    const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/users/sendOTP',
        data: {
            email
        }
    });

    console.log(res);
}