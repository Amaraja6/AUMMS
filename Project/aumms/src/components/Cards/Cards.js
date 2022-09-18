import React from "react";
import CardItems from "./CardItem";
import "./Cards.css";
function Cards() {
  return (
    <div className="cards">
      {/* <h1>Helloo</h1> */}
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItems
              src="/images/mentor1.jpg"
              //text="Explore this beautiful adventure"
              label="Mentor"
              path="/login"
            />
            {/* <CardItems */}
            {/* src="/images/mentor1.jpg" */}
            {/* text="Explore this beautiful adventure" */}
            {/* label="Mentor" */}
            {/* path="/login" */}
            {/* /> */}
            {/* <CardItems */}
            {/* src="/images/mentor1.jpg" */}
            {/* text="Explore this beautiful adventure" */}
            {/* label="Mentor" */}
            {/* path="/login" */}
            {/* /> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Cards;
