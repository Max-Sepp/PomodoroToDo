import React, { useContext, useState, useEffect } from 'react';
import AxiosContext from '../../AxiosContext';
import TodoContext from './TodoContext';


function Editor(props) {
    const AxiosInstance = useContext(AxiosContext)
    const Todo = useContext(TodoContext);

    const getTodos = async () => {
        try {
            await AxiosInstance.TokenInstance.get('/api/todos');
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
            const response = await AxiosInstance.TokenInstance.get('/api/todo/' + props.edit);
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
        AxiosInstance.TokenInstance.put('/api/todo/' + props.edit, inputs)
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