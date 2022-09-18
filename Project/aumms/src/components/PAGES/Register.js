import "../../App.css";
import React from "react";
//importing different components to this file
//import Footer from "../Footer";
import RegisterForm from "../RegisterForm";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
function Register() {
  return (
    <>
      <RegisterForm />
      {/* <Footer /> */}
    </>
  );
}
export default Register;
/*export default is used to export only any single object, function, variable.
from the module so that they can be used by other programs with the help of import*/
