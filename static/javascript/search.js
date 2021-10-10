const searchHelperFunction = async () => {
  // in order to avaoid getting errors when i am not on the page for the table i am only executing this function on the /fetch_page
  // it might make more sense to have the if statment outside the  window.onload adi gia mesa sto function
  if (window.location.pathname === "/search") {
    let search = document.querySelector(".search");
    let searchIcon = document.querySelector(".search__icon");
    let searchInput = document.querySelector(".search__input");
    let searchClose = document.querySelector(".search__close");
    let searchDelete = document.querySelector(".search__delete");

    //for moving the searchIcon after teh
    let SearchContainer = document.getElementById("SearchContainer");

    //get access to the new search button
    let searchButton = document.getElementById("searchButton");

    searchIcon.addEventListener("click", () => {
      search.classList.add("search-open");
      searchInput.focus();
    });

    searchClose.addEventListener("click", () => {
      search.classList.remove("search-open");
      //clear search field on close
      searchInput.value = "";
    });

    searchDelete.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
    });

    let value_in_data;
    searchInput.addEventListener("keyup", async function (event) {
      event.preventDefault();

      if (event.keyCode === 13) {
        // code 13 === Enter button on keyboard
        console.log("Search input: ", searchInput.value);
        value_in_data = searchInput.value;

        //move the icon
        SearchContainer.classList.add("searchCompletedClass");
        //add animation class to the searchButton
        searchButton.classList.add("SearchButtonAnimationClass");

        //poupate the table with the data
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
        // wait for the animation to complete before loading the data from the server
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
    });
  }
};

//execute a function on windows load only when  the url is the one i am getting the data from
if (window.location.pathname === "/search") {
  window.onload = searchHelperFunction;
}
