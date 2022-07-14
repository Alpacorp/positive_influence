import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import Grid from "@material-ui/core/Grid";
import { format } from "date-fns";
import axios from "axios";
import { PutPhone } from "../../Apis/Phones";
import { es } from "date-fns/locale";
import CopyToClipboard from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

const columns = [
  {
    title: "Id Teléfono",
    field: "idphone",
    editable: "never",
    render: (rowData) => {
      return (
        <CopyToClipboard text={rowData.idphone}>
          <p
            onClick={() =>
              toast("Id Teléfono Copiado", { position: "bottom-right" })
            }
            style={{ cursor: "pointer" }}
          >
            {rowData.idphone}
          </p>
        </CopyToClipboard>
      );
    },
  },
  {
    title: "Teléfono",
    field: "number",
    render: (rowData) => {
      return (
        <CopyToClipboard text={rowData.number}>
          <p
            onClick={() =>
              toast("Teléfono Copiado", { position: "bottom-right" })
            }
            style={{ cursor: "pointer" }}
          >
            {rowData.number}
          </p>
        </CopyToClipboard>
      );
    },
  },
  {
    title: "Operador",
    field: "operator",
    lookup: {
      Claro: "Claro",
      Movistar: "Movistar",
      Tigo: "Tigo",
      Avantel: "Avantel",
      VirginMobile: "Virgin Mobile",
      Woom: "Woom",
    },
  },
  {
    title: "Comentario",
    field: "comment",
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

const PhonesTable = () => {
  const [dataTable, setDataTable] = useState([]);
  const urlPhones = `https://accounts-social-control.herokuapp.com/phones/`;

  async function getNumbers() {
    const response = await axios.get(urlPhones);
    setDataTable(response?.data?.message);
  }

  useEffect(() => {
    getNumbers();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid item>
      <MaterialTable
        title="Menciones del Usuario"
        columns={columns}
        data={dataTable}
        getRowId={(row) => row.id}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...dataTable];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                PutPhone(newData);
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

export default PhonesTable;
