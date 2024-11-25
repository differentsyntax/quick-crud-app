import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import "./App.css";
import { Tasks } from "./utilities";

const App = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [task, setTask] = useState<Tasks>({});
  const [id, setId] = useState<number>(1);
  const [edit, setEdit] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<number | undefined>(0);

  const handleTaskAdd = (e: FormEvent) => {
    e.preventDefault();
    if (edit) {
      setTasks((prevState) =>
        prevState.map((item) =>
          item.id === editingItem
            ? { ...item, title: task.title, task: task.task }
            : item
        )
      );
    } else {
      setTasks((prevState: Tasks[]) => [...prevState, { ...task, id: id }]);
    }
    setId((prevState: number) => (!edit ? prevState + 1 : prevState));
    setTask({});
    setEdit(false);
    setEditingItem(0);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = (itemId: number | undefined) => {
    setTasks((prevState) => prevState.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <form onSubmit={handleTaskAdd}>
        <div className="add-task-container">
          <input
            required
            type="text"
            onChange={handleChange}
            value={task.title}
            name="title"
            placeholder={`${task.title}`}
            className="task-input"
          />
          <input
            required
            type="text"
            name="task"
            onChange={handleChange}
            value={task.task}
            placeholder={`${task.task}`}
            className="task-input"
          />

          <button type="submit">{`${edit ? "Save" : "Add"}`}</button>
        </div>
      </form>
      <div className="tasks-container">
        <table>
          <thead>
            <tr>
              <th>{`ID`}</th>
              <th>{`Title`}</th>
              <th>{`Task`}</th>
              <th>{`Operations`}</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.task}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="delete-button"
                    >{`X`}</button>
                    <button
                      onClick={() => {
                        const itemToEdit = tasks.find(
                          (itemCurr) => itemCurr.id === item.id
                        );
                        if (itemToEdit) {
                          setTask(itemToEdit);
                          setEdit(true);
                          setEditingItem(item.id);
                        }
                      }}
                      className="edit-button"
                    >{`<Edit>`}</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
