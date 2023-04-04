import React, { useState } from "react";
import TodoStore from "./TodoStore";
import { observer } from "mobx-react";

interface TodoListProps {
  todoStore: TodoStore;
}

const TodoList = observer((props: TodoListProps) => {
  const [value, setValue] = useState<string>("");

  const { todoStore } = props;

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <button
        onClick={() => {
          if (value) {
            todoStore.addTodo(value);
          }
          setValue("");
        }}
      >
        Add
      </button>
      <div>Completed: {todoStore.status.completed}</div>
      <div>Remaining: {todoStore.status.remaining}</div>

      <ul>
        {todoStore.todos.map((todo) => {
          return (
            <li
              key={todo.id}
              onClick={() => {
                todoStore.toggleTodo(todo.id);
              }}
            >
              {todo.title} [{todo.completed ? "X" : " "}]
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default TodoList;
