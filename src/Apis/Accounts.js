import axios from 'axios';

export const UploadAccount = async ({ idusersocial, email, typeaccount, username, passccount, status, comments, phone }) => {

  const urlMedia = 'https://accounts-social-control.herokuapp.com/media/';

  try {

    const data = {
      idusersocial,
      email,
      typeaccount,
      username,
      passccount,
      status,
      comments,
      phone,
    };
    const response = await axios({
      method: 'POST',
      url: urlMedia,
      data
    });

    if (response.status === 200) {
      alert('Cuenta social ingresada correctamente');
    }
    return response.data;

  } catch (error) {
    alert('No se pudo adicionar la cuenta social');
    console.warn(error);
  };
};

export const PutAccount = async ({ idmedia, idusersocial, email, typeaccount, username, passccount, status, comments, phone }) => {

  const urlMedia = `https://accounts-social-control.herokuapp.com/media/${idmedia}/${typeaccount}`;

  console.log("urlmedia", urlMedia);

  try {

    const data = {
      idusersocial,
      email,
      typeaccount,
      username,
      passccount,
      status,
      comments,
      phone,
    };
    const response = await axios({
      method: 'PUT',
      url: urlMedia,
      data
    });

    if (response.status === 200) {
      alert('Cuenta social actualizada correctamente');
      console.log("urlmedia", urlMedia);
    }

  } catch (error) {
    alert('No se pudo actualizar la cuenta social');
    console.log("urlmedia", urlMedia);
    console.warn(error);
  };
};