import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

  const handleClick=()=>{
    navigate("/Browse");
  }
  
  return (
    <div>
      {/* Footer for the current page */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          // backgroundColor: "#f1f1f1",
        }}

       

      >
        {/* <button style={{background:"violet",color:"black",borderRadius:"5px",padding:"10px"}} onClick={handleClick}>List all Jobs</button> */}
        
      </div>
    </div>
  );
};

export default Footer;



