import React, { useContext, useState } from 'react';
import TodoContext from './TodoContext';
import axios from 'axios';

function Create() {
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
        "body": "",
        "creator": "",
    });

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (e) => {
        if (inputs !== { "title": "", "body": "", "creator": "" }) {
            e.preventDefault();
            axios.post('/api/todos', inputs)
                .then((response) => {
                    getTodos();
                })
                .catch(function (error) {
                    console.log('error occured');
                });
            Todo.setCreate('todos');
        }
    }

    return (
        <div>
            <h3 className='md:text-5xl text-4xl text-black pl-2'>Create a new Todo</h3>
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
                <label className='m-2 flex flex-col'>
                    <h3>Creator:</h3>
                    <input
                        type="text"
                        name="creator"
                        value={inputs.creator}
                        onChange={handleChange}
                        className=""
                    />
                </label>
                <div className='flex flex-row'>
                    <input type="submit" className='bg-indigo rounded-lg p-2 text-white m-2' />
                    <button
                        className='bg-indigo rounded-lg p-2 text-white m-2'
                        onClick={(e) => { e.preventDefault(); Todo.setCreate('todos'); }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Create