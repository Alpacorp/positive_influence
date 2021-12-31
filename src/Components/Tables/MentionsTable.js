import React, { useState, useEffect } from 'react';
import MaterialTable from "@material-table/core";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { PutMention } from '../../Apis/Mentions';

const columns = [
  {
    title: 'Id Mención',
    field: 'idmention',
    editable: 'never',
  },
  {
    title: 'Id Usuario',
    field: 'iduserment',
    editable: 'never',
  },
  {
    title: 'Tipo Cuenta Social',
    field: 'typeaccment',
    editable: 'never',
  },
  {
    title: 'Url Mención',
    field: 'urlment',
  },
  {
    title: 'Fecha Creación',
    field: 'creation',
    editable: 'never',
  },
];

const MentionsTable = ({ iduser, status }) => {

  const [urlUserId, setUrlUserId] = useState(0);
  const [dataTable, setDataTable] = useState([]);
  const urlUserMentions = `https://accounts-social-control.herokuapp.com/mention/${urlUserId}`;

  async function getMentions() {
    setUrlUserId(iduser);
    const response = await axios.get(urlUserMentions);
    setDataTable(response.data);
  };

  useEffect(() => {
    getMentions();
    // eslint-disable-next-line
  }, [status, iduser]);

  return (
    <Grid item>
      <MaterialTable
        title="Menciones del Usuario"
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
                PutMention(newData);
                setDataTable([...dataUpdate]);
                resolve();
              }, 1000)
            }),
        }}
      />
    </Grid>
  );
};

MentionsTable.propTypes = {
  iduser: PropTypes.string,
  status: PropTypes.bool
};

export default MentionsTable;