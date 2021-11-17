import React from 'react';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@material-ui/core/Button';
import { Icon } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import AccountForm from '../../Components/Forms/AccountForm';

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonSearch: {
      marginLeft: 10,
      backgroundColor: 'skyblue',
    },
    infoUser: {
      marginTop: 20,
      display: 'flex',
      justifyContent: 'space-evenly',
      '& .MuiFilledInput-root': {
        margin: '0 2px'
      }
    },
  }))

const Accounts = () => {
  const classes = useStyles()
  return (
    <Grid>
      <form autoComplete="off">
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
      <Grid className={classes.infoUser}>
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
      </Grid>
      <AccountForm />
    </Grid>
  )
}

export default Accounts;