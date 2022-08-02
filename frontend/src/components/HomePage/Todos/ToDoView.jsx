import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TodoContext from './TodoContext';
import { IoRefresh } from "react-icons/io5";

import TodoCard from './TodoCard';

function ToDoView() {
    const Todo = useContext(TodoContext)

    const [todoCards, setTodoCards] = useState()

    const getTodos = async () => {
        try {
            const response = await axios.get('/api/todos');
            Todo.setTodos(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    useEffect(() => {
        setTodoCards(Todo.todos.map((TodoInfo) => <li key={TodoInfo.id}>
            <TodoCard getTodos={getTodos} id={TodoInfo.id} title={TodoInfo.title} body={TodoInfo.body} creator={TodoInfo.creator} completed={TodoInfo.completed} />
        </li>
        ));
    }, [Todo.todos])

    return (
        <>
            <ol>
                {todoCards}
            </ol>
            <IoRefresh onClick={getTodos} size={50} className="mx-auto p-2" />
        </>
    )
}

export default ToDoView