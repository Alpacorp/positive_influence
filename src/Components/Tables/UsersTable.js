import React, { useState, useEffect, useRef } from "react";
import MaterialTable from "@material-table/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import { Toaster, toast } from "react-hot-toast";
import { PutUser } from "../../Apis/Users";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const columns = [
  {
    title: "id",
    field: "iduser",
    editable: "never",
    render: (rowData) => {
      return (
        <CopyToClipboard text={rowData.iduser}>
          <p
            onClick={() =>
              toast("Id Usuario Copiado", { position: "bottom-right" })
            }
            style={{ cursor: "pointer" }}
            className="clickable"
          >
            {rowData.iduser}
          </p>
        </CopyToClipboard>
      );
    },
  },
  {
    title: "Nombres",
    field: "username",
  },
  {
    title: "Apellidos",
    field: "lastname",
  },
  {
    title: "Género",
    field: "gender",
  },
  {
    title: "Perfil",
    field: "profile",
  },
  {
    title: "Fecha Nacimiento",
    field: "birthdate",
  },
  {
    title: "Ciudad",
    field: "city",
  },
  {
    title: "Agente",
    field: "agent",
    editable: "never",
  },
  {
    title: "Fecha Creación dd/mm/yyyy",
    field: "creation",
    editable: "never",
    render: (rowData) => {
      return (
        <p>
          {format(new Date(rowData.creation), "dd/MM/yyyy", { locale: es })}
        </p>
      );
    },
  },
];

const UsersTable = () => {
  const isMounted = useRef(true);
  const [dataTable, setDataTable] = useState([]);
  const urlUsers = "https://accounts-social-control.herokuapp.com/userstable/";

  async function getUsers() {
    const response = await axios.get(urlUsers);
    setDataTable(response?.data.message);
  }

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {isMounted.current && (
        <Grid item>
          <MaterialTable
            title="Usuarios Creados"
            columns={columns}
            options={{
              headerStyle: {
                backgroundColor: "#3887c4",
                color: "#FFF",
              },
            }}
            data={dataTable}
            getRowId={(row) => row.iduser}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...dataTable];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    PutUser(newData);
                    setDataTable([...dataUpdate]);
                    resolve();
                  }, 1000);
                }),
            }}
          />
        </Grid>
      )}
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
};

export default UsersTable;
