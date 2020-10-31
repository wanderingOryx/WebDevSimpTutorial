import React from 'react'
import Todo from './Todo'

export default function TodoList({ listOfTodos, toggleTodo }) {
    return (
        listOfTodos.map(todoEach => {
            return <Todo key={todoEach.id} todo={todoEach} toggleTodo={toggleTodo}/>
        })
    )
}
