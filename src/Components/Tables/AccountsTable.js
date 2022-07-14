import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { Toaster, toast } from "react-hot-toast";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PropTypes from "prop-types";
import { PutAccount } from "../../Apis/Accounts";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const columns = [
  {
    title: "Id Media",
    field: "idmedia",
    editable: "never",
  },
  {
    title: "Id Usuario",
    field: "idusersocial",
    editable: "never",
    render: (rowData) => {
      return (
        <CopyToClipboard text={rowData.idusersocial}>
          <p
            onClick={() =>
              toast("Id Usuario Copiado", { position: "bottom-right" })
            }
            style={{ cursor: "pointer" }}
          >
            {rowData.idusersocial}
          </p>
        </CopyToClipboard>
      );
    },
  },
  {
    title: "Correo Electrónico",
    field: "email",
    render: (rowData) => {
      return (
        <CopyToClipboard text={rowData.email}>
          <p
            onClick={() =>
              toast("Correo Copiado", { position: "bottom-right" })
            }
            style={{ cursor: "pointer" }}
          >
            {rowData.email}
          </p>
        </CopyToClipboard>
      );
    },
  },
  {
    title: "Tipo de Cuenta",
    field: "typeaccount",
    editable: "never",
  },
  {
    title: "Nombre Usuario",
    field: "username",
    render: (rowData) => {
      return (
        <CopyToClipboard text={rowData.username}>
          <p
            onClick={() =>
              toast("Nombre Usuario Copiado", { position: "bottom-right" })
            }
            style={{ cursor: "pointer" }}
          >
            {rowData.username}
          </p>
        </CopyToClipboard>
      );
    },
  },
  {
    title: "Contraseña",
    field: "passccount",
    render: (rowData) => {
      return (
        <CopyToClipboard text={rowData.passccount}>
          <p
            onClick={() =>
              toast("Contraseña Copiada", { position: "bottom-right" })
            }
            style={{ cursor: "pointer" }}
          >
            {rowData.passccount}
          </p>
        </CopyToClipboard>
      );
    },
  },
  {
    title: "Estado",
    field: "status",
    lookup: { Habilitada: "Habilitada", Inhabilitada: "Inhabilitada" },
  },
  {
    title: "Notas Adicionales",
    field: "comments",
  },
  {
    title: "Teléfono",
    field: "phone",
    render: (rowData) => {
      return (
        <CopyToClipboard text={rowData.phone}>
          <p
            onClick={() =>
              toast("Teléfono Copiado", { position: "bottom-right" })
            }
            style={{ cursor: "pointer" }}
          >
            {rowData.phone}
          </p>
        </CopyToClipboard>
      );
    },
  },
  {
    title: "Revisión",
    field: "revision",
    lookup: { Actualizado: "Actualizado", Pendiente: "Pendiente" },
  },
  {
    title: "Fecha de Creación dd/mm/yyyy",
    field: "created",
    editable: "never",
    render: (rowData) => {
      return (
        <p>{format(new Date(rowData.created), "dd/MM/yyyy", { locale: es })}</p>
      );
    },
  },
];

const AccountsTable = ({ searchParam, status, urlParam }) => {
  const [urlSearchParam, setUrlSearchParam] = useState(0);
  const [dataTable, setDataTable] = useState();

  const urlUsersMedia = `${urlParam}${urlSearchParam}/`;

  async function getMedia() {
    const response = await axios.get(urlUsersMedia);
    if (searchParam === "") {
      setUrlSearchParam(0);
    } else {
      setUrlSearchParam(searchParam);
    }
    setDataTable(response?.data.message);
  }

  useEffect(() => {
    getMedia();
    // eslint-disable-next-line
  }, [status, searchParam]);

  return (
    <Grid item>
      <MaterialTable
        title="Cuentas Sociales del Usuario"
        columns={columns}
        data={dataTable}
        getRowId={(row) => row.iduser}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...dataTable];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                PutAccount(newData);
                setDataTable([...dataUpdate]);
                resolve();
              }, 1000);
            }),
        }}
      />
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
    </Grid>
  );
};

AccountsTable.propTypes = {
  status: PropTypes.bool.isRequired,
  searchParam: PropTypes.string,
  urlParam: PropTypes.string,
};

AccountsTable.defaultProps = {
  status: false,
  searchParam: "",
  urlParam: "",
};

export default AccountsTable;
