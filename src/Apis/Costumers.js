import axios from "axios";

export const UploadCostumer = async ({ costumer, comment }) => {
  const urlCostumers =
    "https://accounts-social-control.herokuapp.com/costumers/";

  try {
    const data = {
      costumer,
      comment,
    };
    const response = await axios({
      method: "POST",
      url: urlCostumers,
      data,
    });

    if (response.status === 200) {
      alert("Cliente ingresado correctamente");
    }
    return response.data;
  } catch (error) {
    alert("No se pudo adicionar el cliente");
    console.warn(error);
  }
};

export const PutCostumer = async ({ costumer, idcostumer, comment }) => {
  const urlCostumers = `https://accounts-social-control.herokuapp.com/costumers/${idcostumer}`;

  console.log("urlcostumer", urlCostumers);

  try {
    const data = {
      costumer,
      comment,
    };
    const response = await axios({
      method: "PUT",
      url: urlCostumers,
      data,
    });

    if (response.status === 200) {
      alert("Cliente actualizado correctamente");
    }
  } catch (error) {
    alert("No se pudo actualizar el cliente");
    console.warn(error);
  }
};
