import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { accountState } from '../../MockData/AccountState.json';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      marginLeft: 0,
    },
    '& .MuiButton-root': {
      backgroundColor: 'skyblue',
    },
  },
  formsAccounts: {
    marginTop: 20,
    '& .MuiFormControl-root, .MuiTextField-root': {
    }
  },
  checkBoxInput: {
    margin: 0,
  }
}));

const AccountForm = ({ media, status }) => {
  const classes = useStyles();
  const [stateData, setStateData] = useState();

  const handleState = (event) => {
    setStateData(event.target.value);
  };

  return (
    <Grid className={classes.formsAccounts}>
      <hr />
      <h3>{media}</h3>
      <form autoComplete="off" className={classes.root}>
        <TextField
          id="iduser"
          label="Id User"
          variant="outlined"
          size="small"
          error={false}
          required
          helperText="Digita el id del usuario"
          disabled={status}
        />
        <TextField
          id="email"
          label="Correo Electrónico"
          variant="outlined"
          size="small"
          error={false}
          required
          helperText="Digita el correo"
        />
        <TextField
          disabled
          id={media}
          label="Tipo Cuenta"
          variant="outlined"
          size="small"
          defaultValue={media}
          required
        />
        <TextField
          id="nickname"
          label="Nickname"
          variant="outlined"
          size="small"
          helperText="Digita el Nickname"
          required
        />
        <TextField
          id="password"
          label="Contraseña"
          variant="outlined"
          size="small"
          helperText="Digita la contraseña"
          required
        />
        <TextField
          id="status"
          label="Estado de Cuenta"
          variant="outlined"
          select
          defaultValue=""
          size="small"
          value={stateData ? stateData : ""}
          onChange={handleState}
          helperText="Selecciona el estado"
          required
        >
          {
            accountState.map((status) => (
              <MenuItem key={status.idState} value={status.idState}>
                {status.state}
              </MenuItem>
            ))
          }
        </TextField>
        <TextField
          id="comments"
          label="Comentarios"
          variant="outlined"
          size="small"
          helperText="Tags"
          required
        />
        <TextField
          id="phone"
          label="Teléfono"
          type="number"
          variant="outlined"
          size="small"
          helperText="Digita el teléfono asociado"
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
  );
};

AccountForm.propTypes = {
  media: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired
};

export default AccountForm;