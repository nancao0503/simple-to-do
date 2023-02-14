import { Fragment, useState } from "react";
import "./App.css";

function App() {
  const [toDo, setToDo] = useState([
    { id: "1", title: "task 1", status: false },
    { id: "2", title: "task 2", status: false },
    { id: "3", title: "task 3", status: false },
    { id: "4", title: "task 4", status: false },
    { id: "5", title: "task 5", status: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const clickHanlder = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  const addHandler = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntery = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntery]);
      setNewTask("");
    }
  };

  const deleteHandler = (id) => {
    let newTask = toDo.filter((task) => task.id !== id);

    setToDo(newTask);
  };

  return (
    <div className="App">
      {/*add new task*/}
      <div className="taskBg">
        <div>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="taskInput"
          />
          <button onClick={addHandler} className="taskButton">
            {" "}
            Add Task
          </button>
        </div>

        {/*show Todo */}
        <div>
          <br />
          <br />
          <h2>Not Complete</h2>
          {toDo
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((task, index) => {
              if (!task.status) {
                return (
                  <Fragment key={task.id}>
                    <input
                      type="checkbox"
                      onClick={() => clickHanlder(task.id)}
                      checked={task.status}
                      className="taskCheck"
                    />
                    <span className="taskNumber">{index + 1}</span>
                    <span>{task.title}</span>

                    <br />
                  </Fragment>
                );
              }
            })}
          <br />
          <h2>Completed</h2>
          <div className="taskCompleted">
            {toDo
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((task, index) => {
                if (task.status) {
                  return (
                    <Fragment key={task.id}>
                      <input
                        type="checkbox"
                        onClick={() => clickHanlder(task.id)}
                        checked={task.status}
                        className="taskCheck"
                      />
                      <span className="taskNumber">{index + 1}</span>
                      <span>{task.title}</span>
                      <button
                        onClick={() => deleteHandler(task.id)}
                        className="taskDelete"
                      >
                        delete
                      </button>
                      <br />
                    </Fragment>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
