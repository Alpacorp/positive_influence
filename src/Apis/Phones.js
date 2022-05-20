import axios from "axios";

export const UploadPhone = async ({ number, operator, comment }) => {
  const urlPhones = "https://accounts-social-control.herokuapp.com/phones/";

  try {
    const data = {
      number,
      operator,
      comment,
    };
    const response = await axios({
      method: "POST",
      url: urlPhones,
      data,
    });

    if (response.status === 200) {
      alert("Teléfono ingresado correctamente");
    }
    return response.data;
  } catch (error) {
    alert("No se pudo adicionar el telefóno");
    console.warn(error);
  }
};

export const PutPhone = async ({ number, operator, idphone, comment }) => {
  const urlPhone = `https://accounts-social-control.herokuapp.com/phones/${idphone}`;

  try {
    const data = {
      number,
      operator,
      comment,
    };
    const response = await axios({
      method: "PUT",
      url: urlPhone,
      data,
    });

    if (response.status === 200) {
      alert("Teléfono actualizado correctamente");
    }
  } catch (error) {
    alert("No se pudo actualizar el teléfono");
    console.warn(error);
  }
};
