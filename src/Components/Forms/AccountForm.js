import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { accountState } from '../../MockData/AccountState.json';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Facebook, Mail, Instagram, Twitter } from '../../assets/social-media';

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
  console.log("media", media);
  const classes = useStyles();
  const [stateData, setStateData] = useState();
  const [mediaImage, setMediaImage] = useState();

  const handleState = (event) => {
    setStateData(event.target.value);
  };

  const socialImage = () => {
    switch (media) {
      case 'Mail':
        setMediaImage(Mail)
        break
      case 'Facebook':
        setMediaImage(Facebook)
        break;
      case 'Twitter':
        setMediaImage(Twitter)
        break
      case 'Instagram':
        setMediaImage(Instagram)
        break
      default:
        break;
    };
  };

  useEffect(() => {
    socialImage();
    // eslint-disable-next-line
  }, [status, media]);

  return (
    <Grid className={classes.formsAccounts}>
      <hr />
      <img src={mediaImage} alt={`${media} logo`} />
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
          disabled={status}
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
          disabled={status}
        />
        <TextField
          id="password"
          label="Contraseña"
          variant="outlined"
          size="small"
          helperText="Digita la contraseña"
          required
          disabled={status}
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
          disabled={status}
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
          disabled={status}
        />
        <TextField
          id="phone"
          label="Teléfono"
          type="number"
          variant="outlined"
          size="small"
          helperText="Digita el teléfono asociado"
          required
          disabled={status}
        />
        <Button
          variant="contained"
          color="default"
          endIcon={<Icon>send</Icon>}
          type="submit"
          disabled={status}
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