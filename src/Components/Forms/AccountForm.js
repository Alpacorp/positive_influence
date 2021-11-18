import * as React from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { accountState } from '../../MockData/AccountState.json';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@mui/material'; import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

const AccountForm = () => {
  const classes = useStyles()
  const [checked, setChecked] = useState();
  const [stateData, setStateData] = useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleState = (event) => {
    setStateData(event.target.value);
  }

  return (
    <Grid className={classes.formsAccounts}>
      <form autoComplete="off" className={classes.root}>
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
          id="accountmail"
          label="Tipo Cuenta"
          variant="outlined"
          size="small"
          defaultValue="Mail"
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
        <FormControlLabel
          control={
            <Checkbox
              className={classes.checkBoxInput}
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              required
            />
          }
          label="Selecciona cuando hayas creado la cuenta"
        >
        </FormControlLabel>
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

export default AccountForm;