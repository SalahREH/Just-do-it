import React, { useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

import { useLocation } from 'react-router-dom';

function ListPage() {
    const list = useLocation().state
    let [input, setInput] = useState("")
    let [tasks, setTasks] = useState(list.tasks)

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleKeyDown = e => {
        if (e.keyCode == 13) {
            tasks.push(e.target.value)
            setTasks(tasks)
            setInput('')
        }
    }

    return (
        <div className='App-ListPage'>
            <h2>{list.name}</h2>
            <div className='App-HomePage-lists'>
                {tasks.map((item, i) => (<div key={i} className='App-HomePage-lists-list'>
                    <p>{item}</p>
                    {/* <p className='App-HomePage-lists-list-name'></p> */}
                    {/* <img> urgent and three dots icons with react-icons </img> */}
                    <BsThreeDotsVertical />
                    <div className='App-HomePage-lists-list-underline'></div>
                </div>))}
                <div className='App-HomePage-lists-newList' /* onClick={navigate("")} */>

                    <input type="text" placeholder="New List..." value={input} onChange={handleChange} onKeyDown={handleKeyDown} />
                    {/* <img> urgent with react-icons </img> */}
                    <BsThreeDotsVertical />
                    <div className='App-HomePage-lists-list-underline'></div>
                </div>
            </div>
        </div>
    )
}

export default ListPage