import React, { useEffect, useRef, useState } from "react";
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

  const urlPhone = `https://accounts-social-control.herokuapp.com/phones/${phone}`;
  const urlUsersPhones = `https://accounts-social-control.herokuapp.com/phones/`;

  // const urlPhone = `http://localhost:7000/phones/${phone}`;
  // const urlUsersPhones = `http://localhost:7000/phones/`;

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
      {isMounted.current && (
        <Grid>
          <h2>Consulta el usuario</h2>
          <Grid className={classes.formSearchUser}>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                id="phone"
                name="phone"
                value={phone}
                onChange={handleInputChange}
                label="Teléfono"
                variant="outlined"
                size="small"
                type="number"
                error={false}
                helperText="Digita el número de teléfono"
                required
              />
              <Button
                variant="contained"
                color="default"
                type="submit"
                className={classes.buttonSearch}
                endIcon={<Icon>search</Icon>}
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
