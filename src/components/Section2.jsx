// import axios from "axios";
import React, { useEffect, useState } from "react";
let res=require('./news.json');
let data=res.data;
console.log(data);

const Section2 = () => {
  const [inx,setinx]=useState(-1);
  function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    console.log(randomIndex);
    return randomIndex;
  }
  useEffect(()=>{
    setinx(getRandomItem(data));
  },[])
  return (
    <>
      <div id="section2">
        <div id="section2head">
          Weather news{" "}
          <i class="fa-solid fa-sun rol" style={{ color: "#ff9742" }}></i>
        </div>
        <div>
          {inx !== -1 ? (
            data.map((val, index) => {
              if (inx+7<data.length && index>inx &&index<inx+7) {
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
              } else if(inx+7>data.length && index<=inx && index>inx-6){
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
              }
              else return "";
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
