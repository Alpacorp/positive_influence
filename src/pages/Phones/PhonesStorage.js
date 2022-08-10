import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import { Icon, MenuItem } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import PhonesTable from "../../Components/Tables/PhonesTable";
import { UploadPhone } from "../../Apis/Phones";
import { operators } from "../../MockData/Operators.json";

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
        display: "flex",
        margin: "2px",
        marginLeft: 0,
        maxWidth: 150,
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
    comment: "",
    number: "",
    operator: "",
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
                error={false}
                helperText="Digita el número de teléfono"
                id="number"
                label="Número de teléfono"
                name="number"
                onChange={handleInputChange}
                required
                size="small"
                type="number"
                value={number}
                variant="outlined"
              />
              <TextField
                error={false}
                helperText="Digita el operador de la línea"
                id="operator"
                label="Operador"
                name="operator"
                onChange={handleInputChange}
                required
                select
                size="small"
                type="text"
                value={operator}
                variant="outlined"
              >
                {operators.map((item) => (
                  <MenuItem key={item.value} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                helperText="Comentarios o notas"
                id="comment"
                label="Comentarios"
                name="comment"
                onChange={handleInputChange}
                size="small"
                spellCheck={true}
                value={comment}
                variant="outlined"
              />
              <Button
                className={classes.buttonSearch}
                color="default"
                endIcon={<Icon>send</Icon>}
                type="submit"
                variant="contained"
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
