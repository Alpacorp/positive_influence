import axios from "axios";

export const UploadAccount = async ({
  idusersocial,
  email,
  typeaccount,
  username,
  passccount,
  status,
  comments,
  phone,
  revision,
}) => {
  const urlMedia = "https://accounts-social-control.herokuapp.com/media/";

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
      revision,
    };
    const response = await axios({
      method: "POST",
      url: urlMedia,
      data,
    });

    return response.data;
  } catch (error) {
    alert("No se pudo adicionar la cuenta social");
    console.warn(error);
  }
};

export const PutAccount = async ({
  idusersocial,
  email,
  typeaccount,
  username,
  passccount,
  status,
  comments,
  phone,
  revision,
  social,
}) => {
  const urlMedia = `https://accounts-social-control.herokuapp.com/media/${idusersocial}/${typeaccount}`;
  // const urlMedia = `http://localhost:7000/media/${idusersocial}/${typeaccount}`;

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
      revision,
    };
    const response = await axios({
      method: "PUT",
      url: urlMedia,
      data,
    });

    if (response.status === 200) {
      alert("Cuenta social actualizada correctamente");
    }
  } catch (error) {
    alert("No se pudo actualizar la cuenta social");
    console.warn(error);
  }
};
