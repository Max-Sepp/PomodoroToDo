import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TodoCard from './TodoCard';

function ToDo() {
    const [todos, setTodos] = useState([])
    const [todoCards, setTodoCards] = useState()

    const getTodos = async () => {
        try {
            const response = await axios.get('/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    useEffect(() => {
        setTodoCards(todos.map((TodoInfo) => <TodoCard id={TodoInfo.id} title={TodoInfo.title} body={TodoInfo.body} creator={TodoInfo.creator} />))
    }, [todos])

    return (
        <>
            <h1 className='md:text-6xl text-5xl text-center text-black'>To Do List</h1>
            <ol>
                {todoCards}
            </ol>
        </>
    )
}

export default ToDo