import React, { useState, useEffect } from "react";
import { Button, Icon, TextField } from "@material-ui/core";
import { Box } from "@mui/system";
import { makeStyles, createStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) =>
  createStyles({
    home: {
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      textAlign: "center",
    },
    formModal: {
      "& form": {
        alignItems: "center",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "-webkit-fill-available",
        justifyContent: "center",
        width: "100%",
      },
    },
    snackbar: {
      "& .MuiSnackbarContent-root": {
        backgroundColor: "cornflowerblue",
      },
    },
  })
);

const Home = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(true);
  const [input, setInput] = useState("");
  const [openSnack, setOpenSnack] = useState({
    horizontal: "center",
    open: false,
    vertical: "top",
  });
  const { open, vertical, horizontal } = openSnack;
  const [messageInfo, setMessageInfo] = useState(undefined);
  const localData = localStorage.getItem("key");
  const pat = {
    alejo: "1024483210",
    sandra: "7891",
    diana: "1024483419",
  };

  useEffect(() => {
    if (localData) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
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
    if (pat.alejo === input || pat.sandra === input || pat.diana === input) {
      localStorage.setItem("key", "5191pp02b");
      setOpenModal(false);
      setOpenSnack({ ...openSnack, open: true });
      setMessageInfo("Ingreso Autorizado");
    } else {
      setOpenSnack({ ...openSnack, open: true });
      setMessageInfo("Acceso Denegado");
    }
  };

  const handleClose = () => {
    setOpenSnack({ ...openSnack, open: false });
  };

  const body = (
    <form autoComplete="off">
      <TextField
        autoFocus
        error={false}
        focused
        helperText="Digita la clave"
        id="iduser"
        label="Id Usuario"
        onChange={handleInputChange}
        required
        size="small"
        type="password"
        variant="outlined"
      />
      <Button
        color="default"
        endIcon={<Icon>send</Icon>}
        onClick={handleLogin}
        type="submit"
        variant="contained"
      >
        Buscar Usuario
      </Button>
    </form>
  );

  return (
    <>
      <Box>
        <Modal open={openModal} className={classes.formModal}>
          {body}
        </Modal>
        <Snackbar
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
          anchorOrigin={{ vertical, horizontal }}
          className={classes.snackbar}
          key={vertical + horizontal}
          message={messageInfo}
          onClose={handleClose}
          open={open}
        />
      </Box>
    </>
  );
};

export default Home;
