//packages
import React from "react";
import { useDispatch } from "react-redux";

//extra-reducers
import { deleteTodosAsync } from "../../store/todosSlice/todosSlice";
import { toggleTodosAsync } from "../../store/todosSlice/todosSlice";

//styles
import "../../styles/App.css";

const Todo = ({ todo, id, completed }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTodosAsync(id))}
      />
      <span>{todo}</span>
      <span onClick={() => dispatch(deleteTodosAsync(id))}>&times;</span>
    </div>
  );
};

export default Todo;
