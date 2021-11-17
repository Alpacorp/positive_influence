import * as React from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { genders } from '../../MockData/Genders.json';
import { cities } from '../../MockData/Cities.json';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiButton-root': {
      // height: 55,
      backgroundColor: 'skyblue',
    },
  },
}));



const UserForm = () => {
  const [genderData, setGenderData] = useState();
  const [citiesData, setCitiesData] = useState();
  const classes = useStyles()
  const handleGender = (event) => {
    setGenderData(event.target.value);
  };

  const handleCity = (event) => {
    setCitiesData(event.target.value);
  }
  return (
    <Grid item>
      <form autoComplete="off" className={classes.root}>
        <TextField
          id="username"
          label="Nombres"
          variant="outlined"
          size="small"
          error={false}
          lg={1.5}
          required
          helperText="Digita los nombres"
        />
        <TextField
          id="lastname"
          label="Apellidos"
          variant="outlined"
          size="small"
          required
          helperText="Digita los apellidos"
        />
        <TextField
          id="gender"
          label="Género"
          variant="outlined"
          select
          defaultValue=""
          size="small"
          value={genderData ? genderData : ""}
          onChange={handleGender}
          helperText="Selecciona el género"
          required
        >
          {
            genders.map((item) => (
              <MenuItem key={item.value} value={item.label} >
                {item.label}
              </MenuItem>
            ))
          }
        </TextField>
        <TextField
          id="profile-sele"
          label="Perfil"
          variant="outlined"
          size="small"
          helperText="Digita el perfil del usuario"
          required
        />
        <TextField
          id="birthdate"
          variant="outlined"
          type="date"
          helperText="Fecha de Nacimiento"
          size="small"
          required
        />
        <TextField
          id="citySele"
          label="Selecciona Ciudad"
          variant="outlined"
          select
          defaultValue=""
          size="small"
          value={citiesData ? citiesData : ""}
          onChange={handleCity}
          helperText="Selecciona la Ciudad"
          required
        >
          {
            cities.map((citie) => (
              <MenuItem key={citie.idcity} value={citie.city}>
                {citie.city}
              </MenuItem>
            ))
          }
        </TextField>
        <TextField
          id="agent"
          label="Agente"
          variant="outlined"
          type="number"
          size="small"
          helperText="Selecciona el agente"
          required
        />
        <Button
          variant="contained"
          color="default"
          endIcon={<Icon>send</Icon>}
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </Grid>
  )
}

export default UserForm;