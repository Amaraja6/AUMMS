import "../../App.css";
import React from "react";
//importing different components to this file
// import Footer from "../Footer";
import LoginForm from "../LoginForm";
function Login() {
  return (
    <>
      <LoginForm />
      {/* <Footer /> */}
    </>
  );
}
export default Login;
/*export default is used to export only any single object, function, variable.
from the module so that they can be used by other programs with the help of import*/
