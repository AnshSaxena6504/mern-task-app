import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react'; // Example of an icon library, typically used in React

// NOTE: This API URL must match the running Node.js backend
const API_URL = 'http://localhost:3001/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- FETCH TASKS ---
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks.');
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // --- ADD TASK ---
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const response = await axios.post(API_URL, {
        title: newTaskTitle,
        description: '',
        completed: false,
      });
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
    } catch (err) {
      setError('Failed to add task.');
      console.error('Add Error:', err);
    }
  };

  // --- TOGGLE COMPLETION ---
  const toggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      const response = await axios.put(`${API_URL}/${task.id}`, updatedTask);
      setTasks(
        tasks.map((t) => (t.id === task.id ? response.data : t))
      );
    } catch (err) {
      setError('Failed to update task.');
      console.error('Update Error:', err);
    }
  };

  // --- DELETE TASK ---
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
      console.error('Delete Error:', err);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <p className="text-xl text-indigo-600">Loading Tasks...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-xl p-6 sm:p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
          Task Manager
        </h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Task Input Form */}
        <form onSubmit={addTask} className="flex space-x-3 mb-8">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 shadow-md"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-4">
          {tasks.length === 0 && !loading ? (
            <p className="text-center text-gray-500 py-4">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition duration-200 ease-in-out ${
                  task.completed ? 'bg-green-50 border-l-4 border-green-500' : 'bg-gray-50 border-l-4 border-indigo-500 hover:shadow-md'
                }`}
              >
                <div className="flex items-center flex-grow cursor-pointer" onClick={() => toggleComplete(task)}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded-full border-gray-300 focus:ring-indigo-500 mr-4"
                  />
                  <span
                    className={`text-lg font-medium ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-400 hover:text-red-600 p-2 rounded-full transition duration-150"
                  aria-label="Delete task"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;