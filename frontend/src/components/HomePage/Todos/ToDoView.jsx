import React, { useState, useEffect, useContext } from 'react';
import TodoContext from './TodoContext';
import { IoRefresh } from "react-icons/io5";

import TodoCard from './TodoCard';
import AxiosContext from '../../AxiosContext';

function ToDoView() {
    const Todo = useContext(TodoContext)
    const AxiosInstance = useContext(AxiosContext)

    const [todoCards, setTodoCards] = useState()

    const getTodos = async () => {
        try {
            const response = await AxiosInstance.TokenInstance.get('/api/todos');
            Todo.setTodos(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (AxiosInstance.tokenAvailable) {
            getTodos();
        }
    }, [AxiosInstance.tokenAvailable])

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