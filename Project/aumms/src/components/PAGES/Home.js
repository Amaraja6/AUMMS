import "../../App.css"; //importing css
import React from "react";
//import Cards from "../Cards/Cards";
//importing different components to this file
// import Footer from "../Footer";
import Herosection from "../Herosection";
import Footer from "../Footer/Footer";
function Home() {
  return (
    <>
      <Herosection />
      {/* <Cards /> */}
      <Footer />
    </>
  );
}
export default Home;
/*export default is used to export only any single object, function, variable.
from the module so that they can be used by other programs with the help of import*/
