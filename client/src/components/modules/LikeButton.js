import React, { useState, useEffect } from "react";
import like from "../../../src/public/like.png";
import "./LikeButton.css";

import { post } from "../../utilities";

/**
 * @param {string} parent
 * @param {number} like_nums
 */

const Like = (props) => {
  return (
    <button
      className="like_button"
      onClick={() => {
        const body = { parent: props.parent };
        if (props.like_nums < 100) {
          props.addLike();
          post("/api/like", body).then(() => {});
        }
      }}
    >
      <img className="like_img" src={like} />
      <span className="like_nums">
        {props.like_nums > 99 ? "99+" : props.like_nums}
      </span>
    </button>
  );
};

export default Like;
