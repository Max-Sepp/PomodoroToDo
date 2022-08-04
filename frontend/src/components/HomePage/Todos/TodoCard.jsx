import React, { useState, useContext, useEffect } from 'react';
import TodoContext from './TodoContext';
import { IoPencil, IoTrash } from "react-icons/io5";
import AxiosContext from '../../AxiosContext';

function TodoCard(props) {
    const Todo = useContext(TodoContext);
    const AxiosInstance = useContext(AxiosContext)

    const [checked, setChecked] = useState(props.completed);

    const completedChange = async () => {
        setChecked(!checked);
        try {
            await AxiosInstance.TokenInstance.put('/api/todo/' + props.id, {
                "title": props.title,
                "body": props.body,
                "completed": !checked
            });
        } catch (error) {
            console.error(error);
        }
    }

    const deleteTodo = async () => {
        try {
            await AxiosInstance.TokenInstance.delete('/api/todo/' + props.id);
            props.getTodos();
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => { }, [checked])

    return (
        <div className='group px-2 pb-2 rounded-2xl bg-indigo text-white mx-2 mb-2 flex gap-4 flex-row items-center'>
            <input type="checkbox" checked={checked} onChange={completedChange} className='h-4 w-4' />
            <div>
                <div className="flex flex-row gap-2 items-center">
                    <h2 className='md:text-5xl text-3xl'>{props.title}</h2>
                    <IoPencil size={25} onClick={() => { Todo.setEditor(props.id) }} className="group-hover:visible invisible bg-[#1E033A] rounded-lg p-1" />
                    <IoTrash size={25} onClick={deleteTodo} color="#FF0000" className="group-hover:visible invisible bg-[#1E033A] rounded-lg p-1" />
                </div>
                <p className='md:text-2xl text-xl'>{props.body}</p>
            </div>
        </div>
    )
}

export default TodoCard