import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
let data = require("./MOCK_DATA.json");

const Navbar = (props) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    document.getElementsByClassName('dropdown')[0].style.display='none';
    console.log("search ", searchTerm);
  };

  return (
    <>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid" style={{textAlign:'center'}}>
          <a href="..." class="navbar-brand">Home</a>
          <b id="name">WeatherSense</b>
          <div class="d-flex">
            
          <div className="search-container">
        <div className="search-inner">
          <input id="search" type="text" placeholder="Search here" value={value} onChange={onChange} />
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.city_name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm)
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                className="dropdown-row"
                key={item.city_name}
                onClick={()=>{props.handleclick(value.toLowerCase());onSearch(item.city_name)}}
              >
                {item.city_name}
              </div>
            ))}
        </div>
      </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
