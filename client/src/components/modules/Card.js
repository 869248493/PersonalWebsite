import React, { useState, useEffect } from "react";
import Like from "./LikeButton.js";

import { get } from "../../utilities.js";

/**
 * @param {string} _id of parent
 * @param {string} project_name
 * @param {string} project_description
 * @param {string} project_url
 * @param {image} screenshot
 */

import "./Card.css";

const Card = (props) => {
  const [like, setLike] = useState(0);

  useEffect(() => {
    get("/api/like", { parent: props._id }).then((like) => {
      setLike(like.like_nums);
    });
  }, []);

  const incrementLike = () => {
    setLike(like + 1);
  };

  return (
    <div className="Card-container">
      <a href={props.project_url}>
        <img src={props.screenshot} alt="not found" className="Card-image" />
      </a>
      <div className="Card-textContainer">
        <a href={props.project_url} className="u-link">
          <div className="Card-title">{props.project_name}</div>
        </a>
        <div className="Card-description">{props.project_description}</div>
        <div className="Like-container">
          <Like
            like_nums={like}
            parent={props._id}
            addLike={incrementLike}
            className="Card-like"
          ></Like>
        </div>
      </div>
    </div>
  );
};

export default Card;
