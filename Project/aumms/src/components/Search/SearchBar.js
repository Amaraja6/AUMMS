import React, { useState } from "react";

import axios from "axios";
import validator from "validator";
function SearchBar({ setAuthorize }) {
  let [Keyword, changeKeyword] = useState("");
  let [Mentors, setMentors] = useState([]);
  // const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    if (validator.isEmpty(Keyword)) {
      let res = document.getElementById("response");
      res.innerText = "No result found!";
      setMentors([]);
      return;
    }
    let Domain = document.getElementById("Domain");
    Domain = Domain.options[Domain.selectedIndex].text;
    const NewSearch = {
      Keyword: Keyword,
      Domain: Domain,
    };

    axios
      .post("http://localhost:4000/app/search", NewSearch)
      .then((response) => {
        if (response.data.length === 0) {
          let res = document.getElementById("response");
          res.innerText = "No result found!";
        } else {
          let res = document.getElementById("response");
          res.innerText = "";
        }
        const content = response.data;
        setMentors([...content]);
      });
  }

  return (
    <section className="py-4 container">
      <div className="row justify-content-center">
        <form onSubmit={(event) => onSubmit(event)} className="form-inline">
          <div class="form-group mx-sm-3 mb-2">
            <label htmlFor="keyword" className="sr-only">
              Enter a keyword
            </label>
            <input
              value={Keyword}
              onChange={(event) => {
                changeKeyword(event.target.value);
              }}
              type="text"
              className="form-control"
              id="keyword"
              placeholder="keyword"
            />
          </div>
          <label htmlFor="Domain">Search based on </label>
          <select name="Domain" id="Domain">
            <option value="Knowledge">Knowledge</option>
            <option value="Department">Department</option>
          </select>
          <input
            type="submit"
            value="Search"
            className="btn btn-primary mb-2"
          />
        </form>
        <div id="response" style={{ color: "grey" }}></div>
        {Mentors.map((item, index) => {
          return (
            <div key={index} className="col-5 col-md-4 col-lg-3 mx-0 mb-4">
              <div className="card p-0 overflow-hidden h-100 shadow">
                <div className="card-body">
                  <p className="card-title">
                    {item.FirstName + " " + item.LastName}
                  </p>
                  <p className="card-title">{item.Degree}</p>
                  <p className="card-text">{item.Email}</p>
                  <p className="card-text">{item.Department}</p>
                  <p className="card-text">
                    {
                      new Date(item.GraduationYear)
                        .toLocaleString()
                        .split(",")[0]
                    }
                  </p>
                  <p className="card-text">{item.Knowledge1}</p>
                  <p className="card-text">{item.Knowledge2}</p>
                  <p className="card-text">{item.Knowledge3}</p>
                  <p className="card-text">{item.Knowledge4}</p>
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
