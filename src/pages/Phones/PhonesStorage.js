import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import { Icon } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import PhonesTable from "../../Components/Tables/PhonesTable";
import { UploadPhone } from "../../Apis/Phones";

const useStyles = makeStyles((theme) =>
  createStyles({
    formSearchUser: {
      display: "flex",
      "& fieldset": {
        marginRight: 10,
      },
    },
    infoUser: {
      marginTop: 10,
      "& .MuiFilledInput-root": {
        margin: "2px",
        marginLeft: 0,
        maxWidth: 150,
        display: "flex",
      },
    },
    buttonSearch: {
      backgroundColor: "skyblue",
    },
    typeAccount: {
      marginTop: 20,
      "& fieldset": {
        marginRight: 10,
      },
    },
    dataGrid: {
      marginTop: 20,
    },
    type: {
      marginTop: 30,
    },
  })
);

const PhoneStorage = () => {
  const classes = useStyles();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [formValues, handleInputChange, reset] = useForm({
    number: "",
    operator: "",
    comment: "",
  });

  let { number, operator, comment } = formValues;

  const urlPhone = `https://accounts-social-control.herokuapp.com/phones/${number}`;

  async function getPhone() {
    const res = await axios.get(urlPhone);
    const response = res.data.message;

    if (response[0].length > 0) {
      alert(`El número ${number} ya está registrado, por favor verificar.`);
    } else {
      UploadPhone(formValues);
    }
  }

  const handleSendInfo = (event) => {
    event.preventDefault();
    getPhone();
    event.target.reset();
    reset();
  };

  return (
    <>
      {isMounted.current && (
        <Grid>
          <h2>Registra el número de teléfono</h2>
          <small>
            <strong>Información:</strong> Obtendrás el código ID para que
            controles el inventario físico de tus sim cards.
          </small>
          <Grid>
            <form className={classes.typeAccount} onSubmit={handleSendInfo}>
              <TextField
                id="number"
                name="number"
                value={number}
                onChange={handleInputChange}
                label="Número de teléfono"
                variant="outlined"
                size="small"
                error={false}
                type="number"
                helperText="Digita el número de teléfono"
                required
              />
              <TextField
                id="operator"
                name="operator"
                value={operator}
                onChange={handleInputChange}
                label="Operador"
                variant="outlined"
                size="small"
                error={false}
                type="text"
                helperText="Digita el operador de la línea"
                required
              />
              <TextField
                id="comment"
                name="comment"
                value={comment}
                onChange={handleInputChange}
                label="Comentarios"
                variant="outlined"
                size="small"
                helperText="Comentarios o notas"
                required
                spellCheck={true}
              />
              <Button
                variant="contained"
                color="default"
                type="submit"
                className={classes.buttonSearch}
                endIcon={<Icon>send</Icon>}
              >
                Registrar
              </Button>
            </form>
          </Grid>
          <Grid className={classes.dataGrid}>
            <PhonesTable />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PhoneStorage;
