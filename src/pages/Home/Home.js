import React, { useState, useEffect } from 'react';
import { Button, Icon, TextField } from '@material-ui/core';
import { Box } from '@mui/system';
import { makeStyles, createStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => createStyles({
  home: {
    textAlign: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  formModal: {
    '& form': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%',
      height: '-webkit-fill-available',
      backgroundColor: '#fff',
    }
  },
  snackbar: {
    '& .MuiSnackbarContent-root': {
      backgroundColor: 'cornflowerblue',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(true);
  const [input, setInput] = useState('');
  const [openSnack, setOpenSnack] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });
  const { open, vertical, horizontal } = openSnack;
  const [messageInfo, setMessageInfo] = useState(undefined);
  const localData = localStorage.getItem('key');
  const pat = {
    alejo: '1024',
    andres: '4832',
    sandra: '7891'
  };

  useEffect(() => {
    if (localData) {
      setOpenModal(false);
    } else {
      setOpenModal(true)
    }
  }, [localData]);

  const handleLogin = (event) => {
    event.preventDefault();
    checkPass();
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
  };

  const checkPass = () => {
    if (pat.andres === input || pat.alejo === input || pat.sandra === input) {
      localStorage.setItem('key', '5191pp02b');
      setOpenModal(false);
      setOpenSnack({ ...openSnack, open: true });
      setMessageInfo('Ingreso Autorizado');
    } else {
      setOpenSnack({ ...openSnack, open: true });
      setMessageInfo('Acceso Denegado');
    }
  };

  const handleClose = () => {
    setOpenSnack({ ...openSnack, open: false });
  };

  const body = (
    <form autoComplete="off">
      <TextField
        id="iduser"
        label="Id Usuario"
        variant="outlined"
        size="small"
        error={false}
        type="number"
        helperText="Digita la clave"
        focused
        autoFocus
        onChange={handleInputChange}
        required
      />
      <Button
        variant="contained"
        color="default"
        type="submit"
        endIcon={<Icon>send</Icon>}
        onClick={handleLogin}
      >
        Buscar Usuario
      </Button>
    </form>
  );

  return (
    <>
      <Box >
        <Modal
          open={openModal}
          className={classes.formModal}
        >
          {body}
        </Modal>
        <Snackbar
          className={classes.snackbar}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={messageInfo}
          key={vertical + horizontal}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </Box>
    </>
  );
};

export default Home;