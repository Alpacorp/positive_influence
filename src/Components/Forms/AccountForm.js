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
import { UploadAccount } from '../../Apis/Accounts';

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

const AccountForm = ({ media, statusInput, userid }) => {
  console.log("statusinput", statusInput);
  console.log("userid", userid);
  const classes = useStyles();
  const [mediaImage, setMediaImage] = useState();
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
    idusersocial: '',
    email: '',
    typeaccount: media,
    username: '',
    passccount: '',
    status: '',
    comments: '',
    phone: '',
  });

  const { idusersocial, email, typeaccount, username, passccount, status, comments, phone } = formValues;

  const handleSubmitSend = (event) => {
    event.preventDefault();
    if (idusersocial === userid) {
      UploadAccount(formValues);
    } else {
      alert("LOS VALORES DE LOS CAMPOS 'ID USUARIO' NO SON IGUALES, AJÚSTALOS.");
    }
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
      <form autoComplete="off" className={classes.root} onSubmit={handleSubmitSend}>
        <TextField
          id="idusersocial"
          name="idusersocial"
          label="Id Usuario"
          value={idusersocial}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          error={false}
          required
          helperText="Digita el id del usuario"
          disabled={statusInput}
        />
        <TextField
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          label="Correo Electrónico"
          variant="outlined"
          size="small"
          error={false}
          required
          helperText="Digita el correo"
          disabled={statusInput}
        />
        <TextField
          disabled
          id="typeaccount"
          name='typeaccount'
          value={typeaccount}
          onChange={handleInputChange}
          label="Tipo Cuenta"
          variant="outlined"
          size="small"
          defaultValue={statusInput}
          required
        />
        <TextField
          id="username"
          name='username'
          value={username}
          onChange={handleInputChange}
          label="Username"
          variant="outlined"
          size="small"
          helperText="Digita el Nickname"
          required
          disabled={statusInput}
        />
        <TextField
          id="passccount"
          name='passccount'
          value={passccount}
          onChange={handleInputChange}
          label="Contraseña"
          variant="outlined"
          size="small"
          helperText="Digita la contraseña"
          required
          disabled={statusInput}
        />
        <TextField
          id="status"
          name='status'
          label="Estado de Cuenta"
          variant="outlined"
          select
          defaultValue=""
          size="small"
          value={status}
          onChange={handleInputChange}
          helperText="Selecciona el estado"
          required
          disabled={statusInput}
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
          name='comments'
          value={comments}
          onChange={handleInputChange}
          label="Comentarios"
          variant="outlined"
          size="small"
          helperText="Tags"
          required
          disabled={statusInput}
        />
        <TextField
          id="phone"
          name='phone'
          value={phone}
          onChange={handleInputChange}
          label="Teléfono"
          type="number"
          variant="outlined"
          size="small"
          helperText="Digita el teléfono asociado"
          required
          disabled={statusInput}
        />
        <Button
          variant="contained"
          color="default"
          endIcon={<Icon>send</Icon>}
          type="submit"
          disabled={statusInput}
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