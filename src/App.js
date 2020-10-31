import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v4 as v4} from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameref = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todoM = newTodos.find(todoM => todoM.id === id)
    todoM.complete = !todoM.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameref.current.value
    if (name === '') return
    console.log('adding ' + name)
    setTodos(prevTodos => {
      return [...prevTodos, { id: v4(), name: name, complete: false }]
    })
    todoNameref.current.value = null
  }
  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList listOfTodos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameref} type="text"  />
      <button onClick={handleAddTodo}>Add todo</button>
      <button onclick={handleClearTodos}>Clear Done</button>
      <div>{todos.filter(todo => !todo.complete).length} Todos left to do</div>
    </>
  )
}

export default App;
