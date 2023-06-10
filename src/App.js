import { useEffect, useState } from "react";
import Body from "./components/Body.jsx";
import Navbar from "./components/Navbar.jsx";
import  "./components/style.css";
import Section1 from "./components/Section1.jsx";
import Section2 from "./components/Section2.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  // eslint-disable-next-line
  const [date,setdate]=useState(new Date().getHours());
  const [place,setplace]=useState('delhi');
  function callback(dat){
    setplace(dat);
  }
  useEffect(()=>{
    if(date>15 && date<22){
      document.getElementById('contain').style.backgroundImage="linear-gradient(#8696FE 0% 5%,#FFE79B 20% 60%,#8696FE)";
    }
    else{
      document.getElementById('contain').style.backgroundImage="linear-gradient(#8696FE 0% 5%,#FFE79B 20% 60%,#8696FE)";
    }

  });
  return (
    <>
    <div id="contain">
      <Navbar handleclick={callback}/>
      <Body Place={place}/>
      <Section1 />
      <Section2 />
      <Footer />
    </div>
    </>
  );
}

export default App;
