import React from "react";
import { useNavigate,} from "react-router-dom";
import "../styles/offerBanner.css";

function OfferBanner({
  title,
  subtitle,
  image,
  route,
}) {

  const navigate =
    useNavigate();

  return (

    <div
      className="offer-banner"

      onClick={() =>
        navigate(route)
      }
    >

      <img
        src={image}
        alt={title}
      />

      <div className="offer-content">

        <h2>{title}</h2>

        <p>{subtitle}</p>

      </div>

    </div>
  );
}

export default OfferBanner;