import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles, createStyles } from "@material-ui/styles";
import MentionsTable from "../../Components/Tables/MentionsTable";

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
    typeAccount: {
      marginTop: 20,
      "& fieldset": {
        marginRight: 10,
      },
    },
    dataGrid: {
      marginTop: 20,
    },
    type: {
      marginTop: 30,
    },
  })
);

const LastMentions = () => {
  const classes = useStyles();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const option = 2;

  return (
    <>
      {isMounted.current && (
        <Grid>
          <h2>Últimas Menciones</h2>
          <small>
            <strong>Nota 2:</strong> el usuario debe tener cuentas sociales
            creadas para que se permita el registro de menciones.
          </small>
          <Grid className={classes.dataGrid}>
            <MentionsTable option={option} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default LastMentions;
