import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from './components/todoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ToDoList></ToDoList>
      </header>
    </div>
  );
}

export default App;
