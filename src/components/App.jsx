//packages
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//components
import List from "./List/List";
import Field from "./Field/Field";

//extra-reducers
import { getTodosAsync } from "../store/todosSlice/todosSlice";

const App = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <div>
      <Field value={value} setValue={setValue} />
      <List />
    </div>
  );
};

export default App;
