import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { accountState } from "../../../MockData/AccountState.json";
import { revisionState } from "../../../MockData/Revision.json";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Facebook,
  Mail,
  Instagram,
  Twitter,
} from "../../../assets/social-media";
import { UploadAccount } from "../../../Apis/Accounts";
import axios from "axios";
import validar_clave from "../../../utils/validatePass";
import { useForm } from "../../../hooks/useForm";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
        marginLeft: 0,
      },
      "& .MuiButton-root": {
        backgroundColor: "skyblue",
      },
    },
    formsAccounts: {
      marginTop: 20,
      "& .MuiFormControl-root, .MuiTextField-root": {},
    },
    checkBoxInput: {
      margin: 0,
    },
  })
);

const CreateSocialAccountForm = ({ media, statusInput, userid }) => {
  const classes = useStyles();
  const [validateSocialMedia, setValidateSocialMedia] = useState("");
  const [ok, setOk] = useState("");
  const [resStatus, setResStatus] = useState("");
  const [mediaImage, setMediaImage] = useState("");

  let urlUserMedia = `https://accounts-social-control.herokuapp.com/media/${userid}/${media}/`;

  if (userid === "") {
    userid = 0;
    urlUserMedia = `https://accounts-social-control.herokuapp.com/media/0/${media}/`;
  }

  async function getSocialMedia() {
    const res = await axios.get(urlUserMedia);
    const response = res;
    setResStatus(response.status);
    setValidateSocialMedia(response.data.message.length);
  }

  const [formValues, handleInputChange] = useForm({
    idusersocial: "",
    email: "",
    typeaccount: media,
    username: "",
    passccount: "",
    status: "",
    comments: "",
    phone: "",
    revision: "",
  });

  const {
    idusersocial,
    email,
    typeaccount,
    username,
    passccount,
    status,
    comments,
    phone,
    revision,
  } = formValues;

  const handleSubmitSend = (event) => {
    setOk(1);
    event.preventDefault();
    if (idusersocial !== userid) {
      setOk(2);
      alert(
        "LOS VALORES DE LOS CAMPOS 'ID USUARIO' NO SON IGUALES, AJ??STALOS."
      );
    } else if (validateSocialMedia >= 1) {
      setOk(3);
      alert(
        "ESTA CUENTA SOCIAL YA EXISTE, POR FAVOR HAZ CLIC NUEVAMENTE EN 'BUSCAR USUARIO.'"
      );
    } else if (resStatus === 200) {
      if (!validar_clave(passccount)) {
        alert(
          "La contrase??a ingresada NO ES SEGURA, por favor crearla usando may??sculas, min??sculas, caracteres especiales y n??meros."
        );
      } else {
        getSocialMedia();
        UploadAccount(formValues);
        setOk(4);
        alert("Cuenta social registrada correctamente");
      }
    }
  };

  const socialImage = () => {
    switch (media) {
      case "Mail":
        setMediaImage(Mail);
        break;
      case "Facebook":
        setMediaImage(Facebook);
        break;
      case "Twitter":
        setMediaImage(Twitter);
        break;
      case "Instagram":
        setMediaImage(Instagram);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getSocialMedia();
    // eslint-disable-next-line
  }, [userid, idusersocial, ok]);

  useEffect(() => {
    socialImage();
    // eslint-disable-next-line
  }, [status, media]);

  return (
    <Grid className={classes.formsAccounts}>
      <hr />
      <img src={mediaImage} alt={`${media} logo`} />
      <h3>{media}</h3>
      <form
        autoComplete="off"
        className={classes.root}
        onSubmit={handleSubmitSend}
      >
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
          type="number"
          helperText="Digita el id del usuario"
          disabled={statusInput}
        />
        <TextField
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          label="Correo Electr??nico"
          variant="outlined"
          size="small"
          type="email"
          error={false}
          required
          helperText="Digita el correo"
          disabled={statusInput}
          spellCheck={true}
        />
        <TextField
          disabled
          id="typeaccount"
          name="typeaccount"
          value={typeaccount}
          onChange={handleInputChange}
          label="Tipo Cuenta"
          variant="outlined"
          size="small"
          required
        />
        <TextField
          id="username"
          name="username"
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
          name="passccount"
          value={passccount}
          onChange={handleInputChange}
          label="Contrase??a"
          variant="outlined"
          size="small"
          helperText="Digita la contrase??a"
          required
          disabled={statusInput}
        />
        <TextField
          id="status"
          name="status"
          label="Estado de Cuenta"
          variant="outlined"
          select
          size="small"
          value={status}
          onChange={handleInputChange}
          helperText="Selecciona el estado"
          required
          disabled={statusInput}
        >
          {accountState.map((status) => (
            <MenuItem key={status.idState} value={status.state}>
              {status.state}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="comments"
          name="comments"
          value={comments}
          onChange={handleInputChange}
          label="Comentarios"
          variant="outlined"
          size="small"
          helperText="Comentarios o notas"
          required
          disabled={statusInput}
          spellCheck={true}
        />
        <TextField
          id="phone"
          name="phone"
          value={phone}
          onChange={handleInputChange}
          label="Tel??fono"
          type="number"
          variant="outlined"
          size="small"
          helperText="Digita el tel??fono asociado"
          required
          disabled={statusInput}
        />
        <TextField
          id="revision"
          name="revision"
          label="Revisi??n"
          variant="outlined"
          select
          size="small"
          value={revision}
          onChange={handleInputChange}
          helperText="Selecciona la revisi??n"
          required
          disabled={statusInput}
        >
          {revisionState.map((status) => (
            <MenuItem key={status.idRevision} value={status.revision}>
              {status.revision}
            </MenuItem>
          ))}
        </TextField>
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

CreateSocialAccountForm.propTypes = {
  media: PropTypes.string.isRequired,
  statusInput: PropTypes.bool.isRequired,
  userid: PropTypes.string,
};

CreateSocialAccountForm.defaultProps = {
  media: "",
  statusInpt: true,
  userid: "",
};

export default CreateSocialAccountForm;
