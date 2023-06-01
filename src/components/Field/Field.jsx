//packages
import React from "react";
import { useDispatch } from "react-redux";

//extra-reducers

import { addTodosAsync } from "../../store/todosSlice/todosSlice";

const Field = ({ value, setValue }) => {
  const dispatch = useDispatch();

  const addTask = (value) => {
    dispatch(addTodosAsync(value));
    setValue("");
  };

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => addTask(value)}>add task</button>
    </div>
  );
};

export default Field;
