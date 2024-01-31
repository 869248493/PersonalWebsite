import React, { useState, useEffect } from "react";

import { get } from "../../utilities.js";

const Test = (props) => {
  const [like, setLike] = useState(0);

  //   const mongoose = require("mongoose");
  //   const qu = mongoose.Types.ObjectId("65b83c0cbf989e872c109822");

  useEffect(() => {
    get("/api/like", {
      parent: "65b83c0cbf989e872c109822",
    }).then((like) => {
      setLike(like.like_nums);
    });
  }, []);
  return (
    <div>
      <div>{like}</div>
      <div>testing</div>
    </div>
  );
};

export default Test;
