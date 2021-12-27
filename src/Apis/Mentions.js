import axios from 'axios';

export const PutMention = async ({ idmention, iduserment, typeaccment, urlment }) => {

  const urlMention = `https://accounts-social-control.herokuapp.com/mention/${idmention}`;

  try {
    const data = {
      iduserment,
      typeaccment,
      urlment,
    };

    const response = await axios({
      method: 'PUT',
      url: urlMention,
      data
    });

    console.log("response urlmention", response);

    if (response.status === 200) {
      alert('Mención actualizada correctamente');
    }
  } catch (error) {
    alert('No se pudo actualizar la mención');
    console.warn(error);
  };
};