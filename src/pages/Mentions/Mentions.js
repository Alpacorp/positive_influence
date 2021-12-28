import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@material-ui/core/Button';
import { Icon } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import MentionsTable from '../../Components/Tables/MentionsTable';
import MenuItem from '@material-ui/core/MenuItem';
import { media } from '../../MockData/Media.json';
import axios from 'axios';
import { UploadMention } from '../../Apis/Mentions';

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
  },
  typeAccount: {
    marginTop: 20,
    '& fieldset': {
      marginRight: 10
    },
  },
  dataGrid: {
    marginTop: 20
  }
}));

const Mentions = () => {

  const classes = useStyles();
  const [dataTable, setDataTable] = useState([{}]);
  const [state, setState] = useState(false);

  const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);
    const handleInputChange = ({ target }) => {
      setValues({
        ...values,
        [target.name]: target.value
      })
    }
    return [values, handleInputChange];
  };

  const [formValues, handleInputChange] = useForm({
    userid: '',
    iduserment: '',
    typeaccment: '',
    urlment: '',
  });

  const { userid, iduserment, typeaccment, urlment } = formValues;
  const urlUser = `https://accounts-social-control.herokuapp.com/user/${userid}`;

  async function getUser() {
    const res = await axios.get(urlUser);
    const response = res.data.message[0];
    setState(false);
    setState(true);
    setDataTable(response);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getUser();
  };

  const handleSendInfo = (event) => {
    event.preventDefault();
    if (userid === iduserment) {
      UploadMention(formValues);
    } else {
      alert("LOS VALORES DE LOS CAMPOS 'ID USUARIO' NO SON IGUALES, AJÚSTALOS.");
    }
  };

  return (
    <Grid>
      <h2>Consulta el usuario</h2>
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
          >
            Buscar Usuario
          </Button>
        </form>
      </Grid>
      <Grid>
        <form className={classes.infoUser} onSubmit={handleSendInfo}>
          <TextField
            disabled
            id="iduser"
            name="iduser"
            label="Id Usuario"
            value={state ? dataTable[0].iduser : ''}
            variant="filled"
          />
          <TextField
            disabled
            id="username"
            name="username"
            label="Nombres"
            value={state ? dataTable[0].username : ''}
            variant="filled"
          />
          <TextField
            disabled
            id="lastname"
            name="lastname"
            label="Apellidos"
            value={state ? dataTable[0].lastname : ''}
            variant="filled"
          />
          <TextField
            disabled
            id="gender"
            name="gender"
            label="Género"
            value={state ? dataTable[0].gender : ''}
            variant="filled"
          />
          <TextField
            disabled
            id="profile"
            name="profile"
            label="Perfil"
            value={state ? dataTable[0].profile : ''}
            variant="filled"
          />
          <TextField
            disabled
            id="birthdate"
            label="Fecha Nacimiento"
            value={state ? dataTable[0].birthdate : ''}
            variant="filled"
          />
          <TextField
            disabled
            id="city"
            label="Ciudad"
            value={state ? dataTable[0].city : ''}
            variant="filled"
          />
          <TextField
            disabled
            id="agent"
            label="Agente"
            value={state ? dataTable[0].agent : ''}
            variant="filled"
          />
        </form>
      </Grid>
      <h2>Registra una mención</h2>
      <small>Nota: el Id del usuario consultado debe ser igual al Id del usuario al que vas a ingresar la mención.</small>
      <Grid>
        <form className={classes.typeAccount} onSubmit={handleSendInfo}>
          <TextField
            id="iduserment"
            name="iduserment"
            value={iduserment}
            onChange={handleInputChange}
            label="Id Usuario"
            variant="outlined"
            size="small"
            error={false}
            type="number"
            helperText=""
            required
          />
          <TextField
            id="typeaccment"
            name="typeaccment"
            label="Tipo Cuenta"
            variant="outlined"
            select
            defaultValue=""
            size="small"
            value={typeaccment}
            onChange={handleInputChange}
            helperText="Selecciona el medio"
            required
          >
            {
              media.map((item) => (
                <MenuItem key={item.value} value={item.label} >
                  {item.label}
                </MenuItem>
              ))
            }
          </TextField>
          <TextField
            id="urlment"
            name="urlment"
            value={urlment}
            onChange={handleInputChange}
            label="Url Mención"
            variant="outlined"
            size="small"
            error={false}
            type="url"
            helperText="Copia y ega la url de la mención"
            required
          />
          <Button
            variant="contained"
            color="default"
            type="submit"
            className={classes.buttonSearch}
            endIcon={<Icon>send</Icon>}
          >
            Enviar
          </Button>
        </form>
      </Grid>
      <Grid className={classes.dataGrid}>
        <MentionsTable iduser={userid} status={state} />
      </Grid>
    </Grid>
  );
};

export default Mentions;