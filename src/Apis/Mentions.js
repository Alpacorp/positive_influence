import axios from "axios";

export const UploadMention = async ({
  iduserment,
  typeaccment,
  urlment,
  campain,
}) => {
  const urlMentions = "https://accounts-social-control.herokuapp.com/mentions/";

  try {
    const data = {
      iduserment,
      typeaccment,
      urlment,
      campain,
    };
    const response = await axios({
      method: "POST",
      url: urlMentions,
      data,
    });

    if (response.status === 200) {
      alert("Mención ingresada correctamente");
    }
    return response.data;
  } catch (error) {
    alert("No se pudo adicionar la mención");
    console.warn(error);
  }
};

export const PutMention = async ({
  idmention,
  iduserment,
  typeaccment,
  urlment,
  campain,
}) => {
  const urlMention = `https://accounts-social-control.herokuapp.com/mention/${idmention}`;

  try {
    const data = {
      iduserment,
      typeaccment,
      urlment,
      campain,
    };
    const response = await axios({
      method: "PUT",
      url: urlMention,
      data,
    });

    if (response.status === 200) {
      alert("Mención actualizada correctamente");
    }
  } catch (error) {
    alert("No se pudo actualizar la mención");
    console.warn(error);
  }
};
