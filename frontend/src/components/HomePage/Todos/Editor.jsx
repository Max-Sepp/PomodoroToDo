import React, { useContext, useState, useEffect } from 'react';
import TodoContext from './TodoContext';
import axios from 'axios';

function Editor(props) {
    const Todo = useContext(TodoContext);

    const getTodos = async () => {
        try {
            const response = await axios.get('/api/todos');
            Todo.setTodos(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const [inputs, setInputs] = useState({
        "title": "",
        "body": ""
    });

    const getCurrentInfo = async () => {
        try {
            const response = await axios.get('/api/todo/' + props.edit);
            setInputs(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getCurrentInfo();
    }, [])

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/api/todo/' + props.edit, inputs)
            .then((response) => {
                getTodos();
            })
            .catch(function (error) {
                console.log('error occured');
            });
        Todo.setEditor('todos');
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col max-w-[95%]">
            <label className='m-2 flex flex-col'>
                <h3>Title:</h3>
                <input
                    type="text"
                    name="title"
                    value={inputs.title}
                    onChange={handleChange}
                    className=""
                />
            </label>
            <label className='m-2 flex flex-col'>
                <h3>Body:</h3>
                <input
                    type="text"
                    name="body"
                    value={inputs.body}
                    onChange={handleChange}
                    className=""
                />
            </label>
            <div className='flex flex-row'>
                <input type="submit" className='bg-indigo rounded-lg p-2 text-white m-2' />
                <button
                    className='bg-indigo rounded-lg p-2 text-white m-2'
                    onClick={(e) => { e.preventDefault(); Todo.setEditor('todos'); }}
                >
                    Cancel
                </button>
                <button
                    className='bg-indigo rounded-lg p-2 text-white m-2'
                    onClick={(e) => { e.preventDefault(); getCurrentInfo(); }}
                >
                    Revert
                </button>
            </div>
        </form>
    )
}

export default Editor