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

  console.log('response', response.status);
  console.log('response data', response.data);

  if (response.status === 200) {
    alert('Usuario Ingresado Correctamente');
  }

  return response.data;
};

export const PutUser = async ({ iduser, username, lastname, gender, profile, birthdate, city, agent }) => {

  const urlUser = `https://accounts-social-control.herokuapp.com/user/${iduser}`;

  try {
    const data = {
      username,
      lastname,
      gender,
      profile,
      birthdate,
      city,
      agent,
    }

    const response = await axios({
      method: 'PUT',
      url: urlUser,
      data
    });

    console.log('response', response);

    if (response.status === 200) {
      alert('Usuario Actualizado Correctamente');
    }
  } catch (error) {
    alert('No se pudo hacer la actualización');
    console.warn(error);
  }
};

