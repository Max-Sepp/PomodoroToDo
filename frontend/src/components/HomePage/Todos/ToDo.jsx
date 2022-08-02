import React, { useState } from 'react';
import ToDoView from './ToDoView';
import Editor from './Editor';
import TodoContext from './TodoContext';
import { IoAddCircle } from "react-icons/io5";
import Create from './Create';

function ToDo() {

    const [editor, setEditor] = useState('todos');
    const [create, setCreate] = useState('todos');
    const [todos, setTodos] = useState([])

    return (
        <TodoContext.Provider value={{
            editor,
            setEditor,
            create,
            setCreate,
            todos,
            setTodos
        }}>
            <div className='group flex flex-row gap-4 items-center m-2'>
                <h1 className='md:text-6xl text-5xl text-center text-black pb-2'>To Do List</h1>
                <IoAddCircle
                    size={30}
                    color='#090C09'
                    className='group-hover:visible invisible'
                    onClick={() => { setCreate('creating') }}
                />
            </div>
            {(editor === 'todos' && create === 'todos') ? <ToDoView />
                : (editor !== 'todos' && create === 'todos') ? <Editor edit={editor} />
                    : (editor === 'todos' && create !== 'todos') ? <Create />
                        : null}
        </TodoContext.Provider >
    )
}

export default ToDo