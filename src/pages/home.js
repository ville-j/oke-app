import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBattlesAsync } from "../actions";

const Home = () => {
  console.log("asd");
  const d = useSelector(state => state.data);
  const dispatch = useDispatch();
  console.log(d);
  return (
    <div
      onClick={() => {
        dispatch(getBattlesAsync());
      }}
    >
      home
    </div>
  );
};

export default Home;
