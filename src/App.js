import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./Footer";
import About from "./About";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

// ! Create new axios instance
const foundedTasks = axios.create({
  baseURL: "http://localhost:5000/tasks",
});

function App() {
  // UseState used to manipulate the act of the show and hide of the add tasks form
  const [showAddTask, setShowAddTask] = useState(false);
  // UseState used to manipulate the tasks
  const [tasks, setTasks] = useState([]);

  // UseEffect used to get tasks from server side (Used to perform side effects)
  useEffect(() => {
    // Fetch the tasks from the server
    const func = async () => {
      // Method 1 : directly
      // const response = await foundedTasks.get("");
      // setTasks(response.data);

      // Method 2 : With then and catch
      await foundedTasks
        .get("")
        .then((res) => {
          const response = res.data;
          setTasks(response);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    func();
  }, []);

  // ! Delete func
  // Delete specific task at given index
  const deleteTask = async (id) => {
    await foundedTasks.delete(`/${id}`);
    alert("Post deleted!");
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ! Fetch task func
  // Ftech specific task at given index
  const fetchTask = async (id) => {
    const response = await foundedTasks.get(`/${id}`);
    const data = await response.data;

    return data;
  };

  // ! Update reminder func
  // Update specific task at givenj index with given value
  const toggleReminder = async (id) => {
    // Ftech the specific task with given id
    const taskToToggle = await fetchTask(id);
    // Created new updated task with new given value
    const updateTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder,
    };

    // Update the specific task with the new task value
    const response = await foundedTasks.put(
      `/${id}`,
      updateTask
      // {
      //   text: updateTask.text,
      //   day: updateTask.day,
      //   reminder: updateTask.reminder,
      // }
    );

    // Set the the new task
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: response.data.reminder } : task
      )
    );
  };

  // ! Add new task func
  // Add new task to the tasks list
  const addTask = async (task) => {
    const response = await foundedTasks.post("", {
      text: task.text,
      day: task.day,
      reminder: task.reminder,
    });
    const data = await response.data;
    setTasks([...tasks, data]);
  };
  return (
    <Router>
      <div className="container">
        {/* Header component */}
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {/* Add task form component */}
              {showAddTask && <AddTask onAdd={addTask} />}
              {/* Tasks component */}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "Oops! No Tasks to Show..."
              )}
            </>
          )}
        />
        {/* Route to the About component */}
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
