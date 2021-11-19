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
  }
}));

const Mentions = () => {

  const classes = useStyles();

  const [mediaAccount, setMediaAccount] = useState();

  const handleMedia = (event) => {
    setMediaAccount(event.target.value);
  };

  return (
    <Grid>
      <Grid className={classes.formSearchUser}>
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
        <form autoComplete="off" className={classes.typeAccount}>
          <TextField
            id="typeaccount"
            label="Tipo Cuenta"
            variant="outlined"
            select
            defaultValue=""
            size="small"
            value={mediaAccount ? mediaAccount : ""}
            onChange={handleMedia}
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
            id="urlmention"
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
      <Grid>
        <MentionsTable />
      </Grid>
    </Grid>
  )
}

export default Mentions;