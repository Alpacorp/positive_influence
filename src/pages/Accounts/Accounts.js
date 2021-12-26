import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@material-ui/core/Button';
import { Icon } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import AccountForm from '../../Components/Forms/AccountForm';
import axios from 'axios';
// import getUser from '../../Apis/GetUser';

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

  const iduser = document.getElementById('iduser') ? document.getElementById('iduser').value : '';
  const [dataTable, setDataTable] = useState([]);
  const [state, setState] = useState(false);
  const urlUser = `https://accounts-social-control.herokuapp.com/user/${iduser}`;

  async function getUser() {
    const response = await axios.get(urlUser);
    setState(true)
    setDataTable(response)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getUser();
  };

  const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const handleInputChange = ({ target }) => {
      setValues({
        ...values,
        [target.name]: target.value
      })
    }
    return [values, handleInputChange]
  }

  const [formValues, handleInputChange] = useForm({
    userid: '',
  });

  const { userid } = formValues;

  console.log("datatable external", dataTable.data);
  console.log('state', state);

  const valueInput = () => {
    const value = dataTable.data.message[0].username;
    console.log(value);
    return value;
  }

  return (
    <Grid>
      <Grid className={classes.formSearchUser}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="iduser"
            name='userid'
            value={userid}
            onChange={handleInputChange}
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
          // onClick={handleSubmit}
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
            // defaultValue={prueba ? dataTable.data.message[0].username : 'no'}
            value={state ? dataTable.data : 'no'}
            // defaultValue={dataTable.data.message[0] && dataTable.data.message[0].username}
            // onChange={prueba = false}
            // value={inputValue}
            // onInput={e => setInput(e.target.value)}
            // value={}
            // defaultValue="Alf"
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