//execute the function

const executeHelperFunction = async () => {
  // in order to avaoid getting errors when i am not on the page for the table i am only executing this function on the /fetch_page
  // it might make more sense to have the if statment outside the  window.onload adi gia mesa sto function
  if (window.location.pathname === "/fetch_page") {
    let tableColumns = [
      { title: "Name", field: "Name" },
      { title: "Progress", field: "Progress", sorter: "number" },
      { title: "Gender", field: "Gender" },
      { title: "Rating", field: "Rating" },
      { title: "Favourite Color", field: "FavouriteColor" },
      { title: "Date Of Birth", field: "DateOfBirth", hozAlign: "center" },
    ];
    //to columns sto pandas prepei na kanei match to field ! oxi to title

    // var table = document.getElementById("my_table");

    var table = new Tabulator("#my_table", {
      height: "311px",
      layout: "fitColumns",
      placeholder: "No Data Set",
      columns: tableColumns,
    });

    const getDataFromServer = async () => {
      response = await axios.get("/get_table_data");
      cleanData = JSON.parse(response.data.data);
      //console.log("response:   ", cleanData);

      table.setData(cleanData);
    };

    await getDataFromServer();
  }
};

//execute a function on windows load only when  the url is the one i am getting the data from
window.onload = executeHelperFunction;
