import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./actions";
import { Layout } from "./layouts";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  });
  return <Layout />;
}

export default App;
