import axios from 'axios';

export const UploadUser = async ({ username, lastname, gender, profile, birthdate, city, agent }) => {
  const urlUsers = 'https://accounts-social-control.herokuapp.com/users/';

  const data = {
    username,
    lastname,
    gender,
    profile,
    birthdate,
    city,
    agent,
  }

  console.log(data);

  const response = await axios({
    method: 'POST',
    url: urlUsers,
    data
  });

  console.log('response', response);
  console.log('response data', response.data);

  return response.data;
};

