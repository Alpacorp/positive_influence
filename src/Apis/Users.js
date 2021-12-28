import axios from 'axios';

export const UploadUser = async ({ username, lastname, gender, profile, birthdate, city, agent }) => {

  const urlUsers = 'https://accounts-social-control.herokuapp.com/users/';

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
      method: 'POST',
      url: urlUsers,
      data
    });

    if (response.status === 200) {
      alert('Usuario ingresado correctamente');
    }

    return response.data;

  } catch (error) {
    alert('No se pudo adicionar el usuario');
    console.warn(error);
  };
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
    };

    const response = await axios({
      method: 'PUT',
      url: urlUser,
      data
    });

    if (response.status === 200) {
      alert('Usuario actualizado correctamente');
    }

  } catch (error) {
    alert('No se pudo hacer la actualización');
    console.warn(error);
  };
};

