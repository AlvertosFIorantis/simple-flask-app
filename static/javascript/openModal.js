const openModalHelperFunction = async () => {
  // in order to avaoid getting errors when i am not on the page for the table i am only executing this function on the /fetch_page
  // it might make more sense to have the if statment outside the  window.onload adi gia mesa sto function
  if (window.location.pathname === "/open_modal") {
    const ModalOpenbutton = document.getElementById("mainButton");
    const openModalButton = document.getElementById("openModalButton");
    const closeModalButton = document.getElementById("modalCloseButton");

    const openForm = function () {
      console.log("Open modal");
      ModalOpenbutton.className = "active";
    };

    openModalButton.addEventListener("click", openForm);

    const closeForm = function () {
      console.log("close modal");
      ModalOpenbutton.classList.remove("active");
    };

    closeModalButton.addEventListener("click", closeForm);

    document.addEventListener("keyup", function (e) {
      if (e == 27 || e == 13) {
        closeForm();
      }
    });
  }
};

//execute a function on windows load only when  the url is the one i am getting the data from
if (window.location.pathname === "/open_modal") {
  window.onload = openModalHelperFunction;
}
