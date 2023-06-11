import React, { useState } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import './App.css';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

enum Filter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

const App: React.FC = () => {
  const [newTask, setNewTask] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  const handleToggleTask = (taskId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === taskId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleFilterChange = (selectedFilter: Filter) => {
    setFilter(selectedFilter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === Filter.Active) {
      return !todo.completed;
    } else if (filter === Filter.Completed) {
      return todo.completed;
    } else {
      return true;
    }
  });

  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  return (
    <div className="container">
      <h1>ToDo App</h1>
      <div>
      <TextField label="New Task" value={newTask} onChange={handleInputChange} />
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Add Task
      </Button>
      </div>
      <h2>{filteredTodos.length} items left</h2>
      <div>
        <Button
          variant="contained"
          color="default"
          onClick={() => handleFilterChange(Filter.All)}
        >
          All
        </Button>
        <Button
          variant="contained"
          color="default"
          onClick={() => handleFilterChange(Filter.Active)}
        >
          Active
        </Button>
        <Button
          variant="contained"
          color="default"
          onClick={() => handleFilterChange(Filter.Completed)}
        >
          Completed
        </Button>
        {todos.some((todo) => todo.completed) && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClearCompleted}
          >
            Clear Completed
          </Button>
        )}
      </div>
      <div className="tasks-container">
        <List>
          {filteredTodos.map((todo) => (
            <ListItem key={todo.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleToggleTask(todo.id)}
                  />
                }
                label={todo.text}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default App;
