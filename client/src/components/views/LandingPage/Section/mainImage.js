import React from "react";

function MainImage(props) {
  return (
    <div
      style={{
        //background: `linear-gradient(to bottom,rgba(0,0,0,0)39%,rgba(0,0,0,0)41%,rgba(0,0,0,0.65)100%),url('${props.image}'),#lclclc`,
        background: `url('${props.image}')`,
        height: "500px",
        backgroundSize: "100%,cover",
        backgroundPosition: "center,center",
        width: "100%",
        position: "relative"
      }}
    >
      <div>
        <div
          style={{
            position: "absolute",
            maxWidth: "500px",
            bottom: "2rem",
            marginLeft: "2rem"
          }}
        >
          <h4 className="display-4 text-white">{props.title}</h4>
          <p className="text-white">{props.text}</p>
        </div>
      </div>
    </div>
  );
}
export default MainImage;
