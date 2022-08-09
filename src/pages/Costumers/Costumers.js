import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import { Icon } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import transformText from "../../utils/formatText";
import CostumersTable from "../../Components/Tables/CostumersTable";
import { UploadCostumer } from "../../Apis/Costumers";

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

const Costumers = () => {
  const classes = useStyles();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [formValues, handleInputChange, reset] = useForm({
    costumer: "",
    comment: "",
  });

  let { costumer, comment } = formValues;

  const urlCostumer = `https://accounts-social-control.herokuapp.com/costumers/`;

  async function getCostumer() {
    const res = await axios.get(urlCostumer);
    const response = res.data.message;
    console.log("response", response);
    UploadCostumer(formValues);

    // if (response[0].length > 0) {
    //   alert(`El cliente ${costumer} ya está registrado, por favor verificar.`);
    // } else {
    //   UploadCostumer(formValues);
    // }
  }

  const handleSendInfo = (event) => {
    event.preventDefault();
    getCostumer();
    event.target.reset();
    reset();
  };

  return (
    <>
      {isMounted.current && (
        <Grid>
          <h2>Registra los datos de clientes</h2>
          <Grid>
            <form className={classes.typeAccount} onSubmit={handleSendInfo}>
              <TextField
                id="costumer"
                name="costumer"
                value={transformText(costumer)}
                onChange={handleInputChange}
                label="Nombre del cliente"
                variant="outlined"
                size="small"
                error={false}
                type="text"
                helperText="Digita el nombre del cliente"
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
            <CostumersTable />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Costumers;
