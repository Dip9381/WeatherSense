import axios from "axios";
import React, { useEffect, useState } from "react";

const Section2 = () => {
  const [data, setdata] = useState("");
  useEffect(() => {
    axios
      .get(
        "http://api.mediastack.com/v1/news?access_key=f9fd014d660a2046ada3946de32193a7&keywords=tennis&countries=us,gb,de"
      )
      .then((res) => {
        setdata(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div id="section2">
        <div id="section2head">
          Weather news{" "}
          <i class="fa-solid fa-sun rol" style={{ color: "#ff9742" }}></i>
        </div>
        <div>
          {data.length !== 0 ? (
            data.map((val, index) => {
              if (index < 6) {
                return (
                  <>
                    <div className="cards">
                      <div>{val.title}</div>
                      <div>
                        <div>{val.description}</div>
                        <span>
                          {val.author} &nbsp; {val.category}
                        </span>
                        <div>click to read more --{">"} <button onClick={()=>{window.open(val.url)}}>Read</button> </div>
                      </div>
                    </div>
                  </>
                );
              } else return "";
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Section2;
