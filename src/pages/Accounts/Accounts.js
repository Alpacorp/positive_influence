import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@material-ui/core/Button';
import { Icon } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import AccountForm from '../../Components/Forms/AccountForm';
import axios from 'axios';

const useStyles = makeStyles((theme) => createStyles({
  formSearchUser: {
    display: 'flex',
    '& fieldset': {
      marginRight: 10
    },
  },
  infoUser: {
    marginTop: 10,
    '& .MuiFilledInput-root': {
      margin: '2px',
      marginLeft: 0,
      maxWidth: 150,
      display: 'flex',
    },
  },
  buttonSearch: {
    backgroundColor: 'skyblue',
  }
}));

const Accounts = () => {

  const classes = useStyles();

  const accountmail = "Mail";
  const Facebook = "Facebook";
  const Twitter = "Twitter";
  const Instagram = "Instagram";

  const iduser = document.getElementById('iduser') && document.getElementById('iduser').value;
  console.log("inicial user", iduser);
  const [dataTable, setDataTable] = useState([]);
  const urlUser = `https://accounts-social-control.herokuapp.com/user/${iduser}`;

  async function getUser() {
    const response = await axios.get(urlUser);
    console.log("response", response);
    setDataTable(response)
    return response.data.message[0];
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Consulta Usuario');
    console.log('post user', iduser);
    getUser();
  };

  return (
    <Grid>
      <Grid className={classes.formSearchUser}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="iduser"
            label="Id Usuario"
            variant="outlined"
            size="small"
            error={false}
            type="number"
            helperText="Digita el id del usuario"
            required
          />
          <Button
            variant="contained"
            color="default"
            type="submit"
            className={classes.buttonSearch}
            endIcon={<Icon>search</Icon>}
          >
            Buscar Usuario
          </Button>
        </form>
      </Grid>
      <Grid>
        <form className={classes.infoUser}>
          <TextField
            disabled
            id="username"
            label="Nombres"
            defaultValue="Alejandro"
            variant="filled"
          />
          <TextField
            disabled
            id="lastname"
            label="Apellidos"
            defaultValue="Palacios"
            variant="filled"
          />
          <TextField
            disabled
            id="gender"
            label="Género"
            defaultValue="Masculino"
            variant="filled"
          />
          <TextField
            disabled
            id="profile"
            label="Perfil"
            defaultValue="CEO"
            variant="filled"
          />
          <TextField
            disabled
            id="birthdate"
            label="Fecha Nacimiento"
            defaultValue='03/07/1988'
            variant="filled"
          />
          <TextField
            disabled
            id="city"
            label="Ciudad"
            defaultValue="Bogotá"
            variant="filled"
          />
          <TextField
            disabled
            id="agent"
            label="Agente"
            defaultValue={1}
            variant="filled"
          />
        </form>
      </Grid>
      <Grid>
        <AccountForm props={accountmail} />
        <AccountForm props={Facebook} />
        <AccountForm props={Twitter} />
        <AccountForm props={Instagram} />
      </Grid>
    </Grid>
  )
}

export default Accounts;