import React from "react";

function GridCard(props) {
  if (props.actor_id) {
    return (
      <div className="col col-md-3 col-sm-4 col-xs-12">
        <div className="mb-3" style={{ position: "relative" }}>
          <div className="card shadow-lg">
            <img
              className="card-img-top"
              src={props.image}
              alt="Card image cap"
            />
            <div className="card-body">
              <p className="card-text">
                {props.actor_name} as {props.charcter}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col col-md-3 col-sm-4 col-xs-1">
        <div className="mb-3" style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            {/* <img
              style={{ width: "100%", height: "320px" }}
              alt="img"
              src={props.image}
            ></img> */}
            <div className="card shadow-lg">
              <img
                className="card-img-top"
                src={props.image}
                alt="Card image cap"
              />
              <div className="card-body">
                <p className="card-text">
                  {props.title} in {props.lang}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}
export default GridCard;
