import "../../App.css";
import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
//importing different components to this file
// import Footer from "../Footer";
//import LoginForm from "../LoginForm";
//import CardItem from "../CardItem";
import Cards from "../Cards/Cards";
function center() {
  return (
    <>
      <Cards />

      {/* <Footer /> */}
    </>
  );
}
export default center;
/*export default is used to export only any single object, function, variable.
from the module so that they can be used by other programs with the help of import*/
