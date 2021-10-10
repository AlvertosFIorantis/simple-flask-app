const loginPageHelperFunction = async () => {
  // in order to avaoid getting errors when i am not on the page for the table i am only executing this function on the /fetch_page
  // it might make more sense to have the if statment outside the  window.onload adi gia mesa sto function
  if (window.location.pathname === "/") {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const left_pannel = document.getElementById("left_pannel");
    const right_pannel = document.getElementById("right_pannel");

    const form = document.getElementById("login-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      //add the 2 css classes
      left_pannel.classList.add("exit_pannel_left");
      right_pannel.classList.add("exit_pannel_right");
      // wait for the animation to complete
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //then return true to resovle the e.preventDefault
      console.log("loggin wait completed");
      form.submit();
    });
  }
};

//execute a function on windows load only when  the url is the one i am getting the data from
if (window.location.pathname === "/") {
  window.onload = loginPageHelperFunction;
}
