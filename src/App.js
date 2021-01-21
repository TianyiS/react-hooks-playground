import React from 'react';
import FunctionContextComponent from './functionContextComponent';
import { ThemeProvider } from "./themeContext";
import { useState, useReducer } from 'react';
import Todo from './todo';


// function reducer_count(state, action) {
//   switch(action.type) {
//     case 'increment':
//       return {count: state.count + 1}
//     case 'decrement':
//       return {count: state.count - 1}
//     default:
//       return state
//   }
// }
function reducer(todos, action) {
  switch(action.type) {
    case 'add_todo':
      return [...todos, newTodo(action.payload.name)]
    case 'toggle_todo':
      return todos.map(todo =>{
        if (todo.id === action.payload.id) {
          return {...todo, complete: !todo.complete}
        }
        return todo;
      })
    case 'delete_todo':
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos
  }
}
function newTodo(name) {
  return {id: Date.now(), name: name, complete: false}
}
export default function App() {

  // const [count, setCount] = useState(0)
  // const [state, dispatch] = useReducer(reducer_count, {count : 0})
  const [name, setName] = useState('')
  const [todos, dispatch] = useReducer(reducer, [])

  // function decrement() {
  //   // setCount(prevCount => prevCount - 1)
  //   dispatch({type: 'decrement'})
  // }
 
  // function increment() {
  //   // setCount(prevCount => prevCount + 1)
  //   dispatch({type: 'increment'})
  // }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({type: 'add_todo', payload: {name: name}})
    setName('')
  }

  return (
    <div>
      <ThemeProvider>
        <FunctionContextComponent></FunctionContextComponent>
      </ThemeProvider>
      {/* <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <button style={{margin: '1rem', padding: '0.5rem'}} onClick={decrement}>-</button>
          <span style={{fontSize: '2rem'}}>{state.count}</span>
          <button style={{margin: '1rem', padding: '0.5rem'}} onClick={increment}>+</button>
      </div> */}

      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' value={name} onChange={e => setName(e.target.value)}></input>
        </form>
        <ul>
          {todos.map(todo => 
             <Todo key={todo.id} todo={todo} dispatch={dispatch}></Todo>
          )}
        </ul>
      </div>
    </div>

  );
}

