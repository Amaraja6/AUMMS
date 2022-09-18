import React, { useState } from "react";
import data from "./data";
function SearchBar() {
  const [keyword, searchKeyword] = useState("");
  const searchText = (event) => {
    searchKeyword(event.target.value);
  };
  let dataSearch = data.cardData.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(keyword.toString().toLocaleLowerCase())
    );
  });
  return (
    <section className="py-4 container">
      <div className="row justify-content-center">
        <div className="col-12 mb-5">
          <div className="mb-3 col-4 mx-auto text-center">
            <label className="form-label h4">Search</label>
            <input
              className="form-control"
              type="text"
              value={keyword}
              onChange={searchText.bind(this)}
            />
          </div>
        </div>

        {dataSearch.map((item, index) => {
          return (
            <div key={index} className="col-5 col-md-4 col-lg-3 mx-0 mb-4">
              <div className="card p-0 overflow-hidden h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <h4 className="card-title">{item.dept}</h4>
                  <p className="card-text">{item.subjects}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default SearchBar;
