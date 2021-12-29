import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { genders } from '../../MockData/Genders.json';
import { cities } from '../../MockData/Cities.json';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { UploadUser } from '../../Apis/Users';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiButton-root': {
      backgroundColor: 'skyblue',
    },
  },
}));

const UserForm = () => {
  const classes = useStyles();
  const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);
    const handleInputChange = ({ target }) => {
      setValues({
        ...values,
        [target.name]: target.value
      })
    }
    return [values, handleInputChange]
  };

  const [formValues, handleInputChange] = useForm({
    username: '',
    lastname: '',
    gender: '',
    profile: '',
    birthdate: '',
    city: '',
    agent: '',
  });

  const { username, lastname, gender, profile, birthdate, city, agent } = formValues;

  const handleSubmit = (event) => {
    event.preventDefault();
    UploadUser(formValues);
    event.target.reset();
  };

  return (
    <Grid item>
      <h2>Crear y registrar usuario</h2>
      <form autoComplete="off" id="userForm" className={classes.root} onSubmit={handleSubmit}>
        <TextField
          id="username"
          name="username"
          label="Nombres"
          variant="outlined"
          size="small"
          error={false}
          required
          value={username}
          onChange={handleInputChange}
          helperText="Digita los nombres"
        />
        <TextField
          id="lastname"
          name="lastname"
          label="Apellidos"
          variant="outlined"
          size="small"
          required
          value={lastname}
          onChange={handleInputChange}
          helperText="Digita los apellidos"
        />
        <TextField
          id="gender"
          name="gender"
          label="Género"
          variant="outlined"
          select
          defaultValue=""
          size="small"
          value={gender ? gender : ""}
          helperText="Selecciona el género"
          required
          onChange={handleInputChange}
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
          name="profile"
          label="Perfil"
          variant="outlined"
          size="small"
          helperText="Digita el perfil del usuario"
          required
          value={profile}
          onChange={handleInputChange}
        />
        <TextField
          id="birthdate"
          name="birthdate"
          variant="outlined"
          type="date"
          helperText="Fecha de Nacimiento"
          size="small"
          required
          value={birthdate}
          onChange={handleInputChange}
        />
        <TextField
          id="citySele"
          name="city"
          label="Selecciona Ciudad"
          variant="outlined"
          select
          defaultValue=""
          size="small"
          helperText="Selecciona la Ciudad"
          required
          value={city}
          onChange={handleInputChange}
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
          name="agent"
          label="Agente"
          variant="outlined"
          type="number"
          size="small"
          helperText="Selecciona el agente"
          required
          value={agent}
          onChange={handleInputChange}
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
  );
};

export default UserForm;