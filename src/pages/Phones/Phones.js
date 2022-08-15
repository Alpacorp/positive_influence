import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import { Icon } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import AccountsTable from "../../Components/Tables/AccountsTable";

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

const Phones = () => {
  const classes = useStyles();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [state, setState] = useState(true);

  const [formValues, handleInputChange] = useForm({
    phone: "",
  });

  const { phone } = formValues;

  const urlPhone = `https://accounts-social-control.herokuapp.com/phones/media/${phone}`;
  const urlUsersPhones = `https://accounts-social-control.herokuapp.com/phones/media/`;

  async function getUsersPhone() {
    const res = await axios.get(urlPhone);
    const response = res.data.message[0];
    if (response === [] || !response || response.length === 0) {
      alert(`El teléfono ${phone} no existe, por favor digita correctamente.`);
    } else {
      setState(false);
      setState(true);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getUsersPhone();
  };

  return (
    <>
      <Helmet>
        <title>Teléfonos</title>
      </Helmet>
      {isMounted.current && (
        <Grid>
          <h2>Consulta el número de teléfono</h2>
          <Grid className={classes.formSearchUser}>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                error={false}
                helperText="Digita el número de teléfono"
                id="phone"
                label="Teléfono"
                name="phone"
                onChange={handleInputChange}
                required
                size="small"
                type="number"
                value={phone}
                variant="outlined"
              />
              <Button
                className={classes.buttonSearch}
                color="default"
                endIcon={<Icon>search</Icon>}
                type="submit"
                variant="contained"
              >
                Buscar
              </Button>
            </form>
          </Grid>
          <Grid className={classes.dataGrid}>
            <AccountsTable
              searchParam={phone}
              status={state}
              urlParam={urlUsersPhones}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Phones;
