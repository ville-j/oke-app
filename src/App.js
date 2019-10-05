import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./actions";
import { MainLayout } from "./layouts";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  });
  return <MainLayout />;
}

export default App;
