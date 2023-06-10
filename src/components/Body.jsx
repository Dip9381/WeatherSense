import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { Pagination, Navigation } from "swiper";
import sunny from "./images/sunny.png";
import storm from "./images/storm.png";
import cloudy from "./images/cloudy.png";
import shower from "./images/shower.png";
const Body = (props) => {
  const [data, setdata] = useState("");
  const [data1, setdata1] = useState("");
  const [id, setid] = useState("");
  const [data2, setdata2] = useState("");
  const [data3, setdata3] = useState("");
  const [inx, setinx] = useState(-1);
  const [inx1, setinx1] = useState(-1);
  const [inx2, setinx2] = useState(-1);
  useEffect(() => {
    const options = {
      method: "GET",
      url:
        "https://foreca-weather.p.rapidapi.com/location/search/" + props.Place,
      params: {
        lang: "en",
        country: "in",
      },
      headers: {
        "X-RapidAPI-Key": "267740ae23msh1a62430f605083bp17023ajsna242959ab6f6",
        "X-RapidAPI-Host": "foreca-weather.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        setid(response.data.locations[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.Place]);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://foreca-weather.p.rapidapi.com/forecast/daily/" + id,
      params: {
        alt: "0",
        tempunit: "C",
        windunit: "MS",
        periods: "8",
        dataset: "full",
      },
      headers: {
        "X-RapidAPI-Key": "267740ae23msh1a62430f605083bp17023ajsna242959ab6f6",
        "X-RapidAPI-Host": "foreca-weather.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => {
        setdata(response.data.forecast);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  useEffect(() => {
    // getRandomItem(data1);
  }, [data1]);
  useEffect(() => {
    axios
      .get(
        "https://newsdata.io/api/1/news?apikey=pub_103767b666fc9c698317e5405e0dcd8590957&q=weather&language=en&category=world"
      )
      .then((response) => {
        setdata1(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        "https://newsdata.io/api/1/news?apikey=pub_103767b666fc9c698317e5405e0dcd8590957&q=thunderstorm&language=en&category=top,world "
      )
      .then((response) => {
        setdata2(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });

      const options = {
        method: 'GET',
        url: 'https://climate-news-feed.p.rapidapi.com/',
        params: {
          source: 'Nasa Climate',
          limit: '50',
          exclude: 'The Guardian'
        },
        headers: {
          'X-RapidAPI-Key': '267740ae23msh1a62430f605083bp17023ajsna242959ab6f6',
          'X-RapidAPI-Host': 'climate-news-feed.p.rapidapi.com'
        }
      };
      axios
      .request(options)
      .then((response) => {
        setdata3(response.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setinx(getRandomItem(data1));
  }, [data1]);
  useEffect(() => {
    setinx1(getRandomItem(data2));
  }, [data2]);
  useEffect(() => {
    setinx2(getRandomItem(data3));
  }, [data3]);

  function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    console.log(randomIndex);
    return randomIndex;
  }
  return (
    <>
      <div id="container1">
        <div id="box1">
          <div className="heading">
            {" "}
            <span id="live">.</span> <span>Live News</span>
          </div>
          <div id="news1">
            {data1.length !== 0 && inx !== -1 ? (
              <>
                <div onClick={()=>(window.open(data1[inx].link))}>
                  <div>
                    <img
                      id="livenews1"
                      src={data1[inx].image_url}
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div id="title1">{data1[inx].title}</div>
                  <div id="desc1">
                    {data1[inx].description.split(" ").slice(0, 30).join(" ")}
                    ...
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div id="news2">
            {data2.length !== 0 && inx1 !== -1 ? (
              <>
                <div onClick={()=>(window.open(data2[inx1].link))}>
                  <div>
                    <img
                      id="livenews2"
                      src={data2[inx1].image_url}
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div id="title2">{data2[inx1].title}</div>
                  <div id="desc2">
                    {data2[inx1].description.split(" ").slice(0, 30).join(" ")}
                    ...
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
         
        </div>
        <div id="box2">
          <Swiper
            pagination={{
              type: "progressbar",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="tiles">
                {data.length !== 0 ? (
                  data.map((val, index) => {
                    if (index === 0 || index === 1 || index === 2) {
                      return (
                        <>
                          <div className="tile">
                            <div className="weather">
                              {val.symbolPhrase.split(" ").indexOf("clear") >
                              -1 ? (
                                <img src={sunny} alt="sunny.png" srcset="" />
                              ) : (
                                <></>
                              )}
                              {val.symbolPhrase
                                .split(" ")
                                .indexOf("thunderstorms") > -1 ? (
                                <img src={storm} alt="storm.png" srcset="" />
                              ) : (
                                <></>
                              )}
                              {val.symbolPhrase.split(" ").indexOf("cloudy") >
                              -1 ? (
                                <img src={cloudy} alt="cloudy.png" srcset="" />
                              ) : (
                                <></>
                              )}
                              {val.symbolPhrase.split(" ").indexOf("showers") >
                                -1 ||
                              val.symbolPhrase.split(" ").indexOf("light") >
                                -1 ? (
                                <img src={shower} alt="shower.png" srcset="" />
                              ) : (
                                <></>
                              )}
                            </div>
                            <span>Date:</span> {val.date} <br />
                            <span>Max Temp:</span> {val.maxTemp} &nbsp;
                            <span>Min Temp:</span> {val.minTemp} <br />
                            <span>Sunrise:</span> {val.sunrise} <br />
                            <span>Expected sunset:</span> {val.sunset} <br />
                            <span>Humidity:</span> {val.maxRelHumidity} <br />
                            <span>Pressure:</span> {val.pressure} <br />
                            <b>
                              {props.Place.charAt(0).toUpperCase() +
                                props.Place.slice(1)}{" "}
                              will have {val.symbolPhrase}
                            </b>{" "}
                            <br />
                            <span>Cloud cover:</span> {val.cloudiness}% <br />
                            <span>Max Dew point:</span> {val.maxDewPoint} &nbsp;
                            <span>Min Dew point:</span> {val.minDewPoint} <br />
                            <span>Precipitation Prob.:</span> {val.precipProb}%{" "}
                            <br />
                            <span>UV index:</span> {val.uvIndex} <br />
                          </div>
                        </>
                      );
                    } else return "";
                  })
                ) : (
                  <></>
                )}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="tiles">
                {data.length !== 0 ? (
                  data.map((val, index) => {
                    if (index === 3 || index === 4 || index === 5) {
                      return (
                        <>
                          <div className="tile">
                            <div className="weather">
                              {val.symbolPhrase.split(" ").indexOf("clear") >
                              -1 ? (
                                <img src={sunny} alt="sunny.png" srcset="" />
                              ) : (
                                <></>
                              )}
                              {val.symbolPhrase
                                .split(" ")
                                .indexOf("thunderstorms") > -1 ? (
                                <img src={storm} alt="storm.png" srcset="" />
                              ) : (
                                <></>
                              )}
                              {val.symbolPhrase.split(" ").indexOf("cloudy") >
                              -1 ? (
                                <img src={cloudy} alt="cloudy.png" srcset="" />
                              ) : (
                                <></>
                              )}
                              {val.symbolPhrase.split(" ").indexOf("showers") >
                              -1 ? (
                                <img src={shower} alt="shower.png" srcset="" />
                              ) : (
                                <></>
                              )}
                            </div>
                            <span>Date:</span> {val.date} <br />
                            <span>Max Temp:</span> {val.maxTemp} &nbsp;
                            <span>Min Temp:</span> {val.minTemp} <br />
                            <span>Sunrise:</span> {val.sunrise} <br />
                            <span>Expected sunset:</span> {val.sunset} <br />
                            <span>Humidity:</span> {val.maxRelHumidity} <br />
                            <span>Pressure:</span> {val.pressure} <br />
                            <b>
                              {props.Place.charAt(0).toUpperCase() +
                                props.Place.slice(1)}{" "}
                              will have {val.symbolPhrase}
                            </b>{" "}
                            <br />
                            <span>Cloud cover:</span> {val.cloudiness}% <br />
                            <span>Max Dew point:</span> {val.maxDewPoint} &nbsp;
                            <span>Min Dew point:</span> {val.minDewPoint} <br />
                            <span>Precipitation Prob.:</span> {val.precipProb}%{" "}
                            <br />
                            <span>UV index:</span> {val.uvIndex} <br />
                          </div>
                        </>
                      );
                    } else return "";
                  })
                ) : (
                  <></>
                )}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="tiles">
                {data.length !== 0 ? (
                  data.map((val, index) => {
                    if (index === 6 || index === 7) {
                      return (
                        <>
                          <div className="tile">
                            <div className="weather">
                              {val.symbolPhrase.split(" ").indexOf("clear") >
                              -1 ? (
                                <img src={sunny} alt="sunny.png" srcset="" />
                              ) : (
                                <></>
                              )}
                              {val.symbolPhrase
                                .split(" ")
                                .indexOf("thunderstorms") > -1 ? (
                                <img src={storm} alt="storm.png" srcset="" />
                              ) : (
                                <></>
                              )}
                              {val.symbolPhrase.split(" ").indexOf("cloudy") >
                              -1 ? (
                                <img src={cloudy} alt="cloudy.png" srcset="" />
                              ) : (
                                <></>
                              )}
                              {val.symbolPhrase.split(" ").indexOf("showers") >
                              -1 ? (
                                <img src={shower} alt="shower.png" srcset="" />
                              ) : (
                                <></>
                              )}
                            </div>
                            <span>Date:</span> {val.date} <br />
                            <span>Max Temp:</span> {val.maxTemp} &nbsp;
                            <span>Min Temp:</span> {val.minTemp} <br />
                            <span>Sunrise:</span> {val.sunrise} <br />
                            <span>Expected sunset:</span> {val.sunset} <br />
                            <span>Humidity:</span> {val.maxRelHumidity} <br />
                            <span>Pressure:</span> {val.pressure} <br />
                            <b>
                              {props.Place.charAt(0).toUpperCase() +
                                props.Place.slice(1)}{" "}
                              will have {val.symbolPhrase}
                            </b>{" "}
                            <br />
                            <span>Cloud cover:</span> {val.cloudiness}% <br />
                            <span>Max Dew point:</span> {val.maxDewPoint} &nbsp;
                            <span>Min Dew point:</span> {val.minDewPoint} <br />
                            <span>Precipitation Prob.:</span> {val.precipProb}%{" "}
                            <br />
                            <span>UV index:</span> {val.uvIndex} <br />
                          </div>
                        </>
                      );
                    } else return "";
                  })
                ) : (
                  <></>
                )}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div id="box3">
          <div className="heading">Top Articles</div>
          {
            data3.length!==0 && inx2!==-1?<>
            <div className="articles" onClick={()=>{window.open(data3[inx2].url)}}>
              <div><img className="img1" src={data3[inx2].thumbnail} alt="" srcset="" /></div>
              <div className="title">{data3[inx2].title}</div>
              <div className="source">source: {data3[inx2].source}</div>
              <div className="pub">{data3[inx2].published.slice(0,10)}</div>
            </div>
            {
              inx2+1>=data3.length?<>
                <div className="articles" onClick={()=>{window.open(data3[inx2-1].url)}}>
              <div><img className="img1" src={data3[inx2-1].thumbnail} alt="" srcset="" /></div>
              <div className="title">{data3[inx2-1].title}</div>
              <div className="source">source: {data3[inx2-1].source}</div>
              <div className="pub">{data3[inx2-1].published.slice(0,10)}</div>
            </div>
              </>:<>
              <div className="articles" onClick={()=>{window.open(data3[inx2+1].url)}}>
              <div><img className="img1" src={data3[inx2+1].thumbnail} alt="" srcset="" /></div>
              <div className="title">{data3[inx2+1].title}</div>
              <div className="source">souce: {data3[inx2+1].source}</div>
              <div className="pub">{data3[inx2+1].published.slice(0,10)}</div>
            </div>
              </>
            }
            </>:<></>
          }
        </div>
      </div>
    </>
  );
};

export default Body;
