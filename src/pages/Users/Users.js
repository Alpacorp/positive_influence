import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import Grid from "@material-ui/core/Grid";
import CreateUserForm from "../../Components/Forms/Users/CreateUserForm";
import UsersTable from "../../Components/Tables/UsersTable";

const Users = () => {
  const isMount = useRef(true);

  useEffect(() => {
    return () => {
      isMount.current = false;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Usuarios</title>
      </Helmet>
      {isMount.current && (
        <Grid>
          <CreateUserForm />
          <UsersTable />
        </Grid>
      )}
    </>
  );
};

export default Users;
