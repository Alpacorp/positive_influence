import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import Grid from "@material-ui/core/Grid";
import { format } from "date-fns";
import axios from "axios";
import { es } from "date-fns/locale";
import CopyToClipboard from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import { PutCostumer } from "../../Apis/Costumers";

const columns = [
  {
    title: "Id Cliente",
    field: "idcostumer",
    editable: "never",
    render: (rowData) => {
      return (
        <CopyToClipboard text={rowData.idcostumer}>
          <p
            onClick={() =>
              toast("Id Cliente Copiado", { position: "bottom-right" })
            }
            style={{ cursor: "pointer" }}
            className="clickable"
          >
            {rowData.idcostumer}
          </p>
        </CopyToClipboard>
      );
    },
  },
  {
    title: "Nombre",
    field: "costumer",
    render: (rowData) => {
      return (
        <CopyToClipboard text={rowData.costumer}>
          <p
            onClick={() =>
              toast("Nombre Copiado", { position: "bottom-right" })
            }
            style={{ cursor: "pointer" }}
            className="clickable"
          >
            {rowData.costumer}
          </p>
        </CopyToClipboard>
      );
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

const CostumersTable = () => {
  const [dataTable, setDataTable] = useState([]);
  const urlCostumers = `https://accounts-social-control.herokuapp.com/costumers/`;

  async function getCostumers() {
    const response = await axios.get(urlCostumers);
    setDataTable(response?.data?.message);
  }

  useEffect(() => {
    getCostumers();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid item>
      <MaterialTable
        title={`Listado de Clientes - (${dataTable?.length || 0})`}
        columns={columns}
        data={dataTable}
        getRowId={(row) => row.idcostumer}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...dataTable];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                PutCostumer(newData);
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

export default CostumersTable;
