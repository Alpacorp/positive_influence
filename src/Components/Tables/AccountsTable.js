import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
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
  },
  {
    title: "Correo Electrónico",
    field: "email",
  },
  {
    title: "Tipo de Cuenta",
    field: "typeaccount",
    editable: "never",
  },
  {
    title: "Nombre Usuario",
    field: "username",
  },
  {
    title: "Contraseña",
    field: "passccount",
  },
  {
    title: "Estado",
    field: "status",
  },
  {
    title: "Notas Adicionales",
    field: "comments",
  },
  {
    title: "Teléfono",
    field: "phone",
  },
  {
    title: "Revisión",
    field: "revision",
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
