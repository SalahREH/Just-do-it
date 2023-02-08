import React, { useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';

function ListPage() {
    const list = useLocation().state
    let [input, setInput] = useState("")
    let [tasks, setTasks] = useState(list.tasks)
    let [edit, setEdit] = useState({ id: null, value: '' })

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

    const handleEditChange = e => {
    }

    const handleEditKeyDown = e => {      
        if (e.keyCode == 13) {
            // setTasks(lists => lists.map((item, id) => (item == newValue.value) ? newValue.value : item))
            edit.value = e.target.value
            setEdit({ id: null, value: '' })
        }
    }

    return (
        <div className='App-ListPage'>
            {edit.id ?
                <>
                    <h2>Changing the name...</h2>
                    <div className='App-HomePage-lists'>
                        <div className='App-HomePage-lists-newList'>
                            <input type="text" placeholder="New name..." onChange={handleEditChange} onKeyDown={handleEditKeyDown} />

                            <BsThreeDotsVertical />
                            <div className='App-HomePage-lists-list-underline'></div>
                        </div>
                    </div>
                </>
                :
                <>
                    <h2>{list.name}</h2>
                    <div className='App-ListPage-lists'>
                        {tasks.map((item, i) => (<div key={i} className='App-ListPage-lists-list'>
                            <p>{item.value}</p>
                            {/* <img> urgent  with react-icons </img> */}
                            <BsThreeDotsVertical onClick={() => { setEdit(item) }} />
                            <div className='App-ListPage-lists-list-underline'></div>
                        </div>))}
                        <div className='App-ListPage-lists-newList' /* onClick={navigate("")} */>

                            <input type="text" placeholder="New List..." value={input} onChange={handleChange} onKeyDown={handleKeyDown} />
                            <BsThreeDotsVertical />
                            <div className='App-ListPage-lists-list-underline'></div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ListPage