import React from 'react'

function TodoCard(props) {
    return (
        <li key={props.id} className='p-2 rounded-2xl bg-indigo text-white m-2'>
            <h2 className='md:text-5xl text-3xl '>{props.title}</h2>
            <p className='md:text-2xl text-xl'>{props.body}</p>
            <footer className='md:text-base text-sm'>{props.creator}</footer>
        </li>
    )
}

export default TodoCard