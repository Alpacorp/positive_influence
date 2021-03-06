import React, { useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import { Icon } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import CreateSocialAccountForm from "../../Components/Forms/Accounts/CreateSocialAccountForm";
import axios from "axios";
import AccountsTable from "../../Components/Tables/AccountsTable";
import { withTransaction } from "@elastic/apm-rum-react";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    formSearchUser: {
      display: "flex",
      "& fieldset": {
        marginRight: 10,
      },
    },
    infoUser: {
      marginTop: 10,
      "& .MuiFilledInput-root": {
        margin: "2px",
        marginLeft: 0,
        maxWidth: 150,
        display: "flex",
      },
    },
    buttonSearch: {
      backgroundColor: "skyblue",
    },
  })
);

const Accounts = () => {
  const classes = useStyles();

  const isMounted = useRef(true);

  const [formValues, handleInputChange] = useForm({
    userid: "",
  });

  const { userid } = formValues;

  const mediaData = ["Mail", "Facebook", "Twitter", "Instagram"];
  const [dataTable, setDataTable] = useState([{}]);
  const [state, setState] = useState(false);
  const [mediaQ, setMediaQ] = useState("");
  const [mediaGet, setMediaGet] = useState([""]);
  const [status, setStatus] = useState(true);
  const mediaNotFound = mediaData.filter((media) => !mediaGet.includes(media));

  const urlUser = `https://accounts-social-control.herokuapp.com/user/${userid}`;
  const urlUsersMedia = `https://accounts-social-control.herokuapp.com/media/`;

  async function getUser() {
    const res = await axios.get(urlUser);
    const response = res.data.message[0];
    if (response === [] || !response || response.length === 0) {
      alert(
        `El usuario con id ${userid} no existe, por favor corrige tu selecci??n.`
      );
    } else {
      setState(false);
      setState(true);
      setStatus(false);
      setDataTable(response);
    }

    const resMedia = await axios.get(`${urlUsersMedia}${userid}`);
    const responseMedia = resMedia.data.message.length;
    const resMediaData = resMedia.data.message;
    setMediaQ(responseMedia);

    const responseSocialMedia = resMediaData.map((res) => res.typeaccount);
    setMediaGet(responseSocialMedia);
  }

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    getUser();
  };

  return (
    <>
      {isMounted.current && (
        <Grid>
          <h2>Consulta el usuario</h2>
          <Grid className={classes.formSearchUser}>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                id="iduser"
                name="userid"
                value={userid}
                onChange={handleInputChange}
                label="Id Usuario"
                variant="outlined"
                size="small"
                error={false}
                type="number"
                helperText="Digita el id del usuario para consultarlo"
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
                value={state ? dataTable[0].username : ""}
                variant="filled"
              />
              <TextField
                disabled
                id="lastname"
                label="Apellidos"
                value={state ? dataTable[0].lastname : ""}
                variant="filled"
              />
              <TextField
                disabled
                id="gender"
                label="G??nero"
                value={state ? dataTable[0].gender : ""}
                variant="filled"
              />
              <TextField
                disabled
                id="profile"
                label="Perfil"
                value={state ? dataTable[0].profile : ""}
                variant="filled"
              />
              <TextField
                disabled
                id="birthdate"
                label="Fecha Nacimiento"
                value={state ? dataTable[0].birthdate : ""}
                variant="filled"
              />
              <TextField
                disabled
                id="city"
                label="Ciudad"
                value={state ? dataTable[0].city : ""}
                variant="filled"
              />
              <TextField
                disabled
                id="agent"
                label="Agente"
                value={state ? dataTable[0].agent : ""}
                variant="filled"
              />
              <TextField
                disabled
                id="mediaQ"
                label="Cuentas Sociales"
                value={mediaQ}
                variant="filled"
              />
            </form>
          </Grid>
          <Grid>
            {mediaNotFound.length === 0 ? (
              <h2>Usuario Completo</h2>
            ) : (
              mediaNotFound.map((media) => (
                <CreateSocialAccountForm
                  media={media}
                  key={media}
                  statusInput={status}
                  userid={userid}
                />
              ))
            )}
            <AccountsTable
              searchParam={userid}
              status={state}
              urlParam={urlUsersMedia}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default withTransaction("Accounts", "component")(Accounts);
