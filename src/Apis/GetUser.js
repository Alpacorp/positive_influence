async function getUser(url) {
  // const response = await axios.get(urlUser);
  const response = await fetch(url);
  const json = await response.json();
  console.log("response", response);
  console.log("response json", json);
  // console.log("response data", response.data.message[0]);
  // setDataTable(json)
  // return response.data.message[0];
  // console.log("dataTable", dataTable);
}

export default getUser;