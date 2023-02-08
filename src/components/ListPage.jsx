import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { CiCircleRemove, CiEdit } from "react-icons/ci";


function ListPage() {
    const stateList = useLocation().state
    let [input, setInput] = useState("")
    let [tasks, setTasks] = useState(stateList.tasks)
    let [edit, setEdit] = useState({ id: null, value: '' })

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleKeyDown = e => {
        if (e.keyCode == 13) {
            tasks.push({ id: uuidv4(), value: e.target.value })
            setTasks(tasks)
            updateLocalStorage(tasks)
            setInput('')
        }
    }

    const handleEditKeyDown = e => {
        if (e.keyCode == 13) {
            // setTasks(lists => lists.map((item, id) => (item == newValue.value) ? newValue.value : item))
            edit.value = e.target.value
            setEdit({ id: null, value: '' })
        }
    }

    const removeList = id => {
        let newArr = [...tasks].filter(task => task.id != id)
        setTasks(newArr)
        updateLocalStorage(newArr)
    }

    const updateLocalStorage = (newTask) => {

        let changedList = JSON.parse(localStorage.getItem("lists")).map((list) => {
            if (list.id === stateList.id) {
                list.tasks = newTask
            }
            return list
        })
        localStorage.setItem("lists", JSON.stringify(changedList))
    }

    useEffect(()=>{
        let localStorageList = JSON.parse(localStorage.getItem("lists"))
        if(localStorageList){
            localStorageList.map(list => {
            if(list.id == stateList.id){
                setTasks(list.tasks)
            }
        })
        }
        
    }, [])

    return (
        <div className='App-ListPage'>
            {edit.id ?
                <>
                    <h2>Changing the name...</h2>
                    <div className='App-HomePage-lists'>
                        <div className='App-HomePage-lists-newList'>
                            <input type="text" placeholder={edit.value} onKeyDown={handleEditKeyDown} />
                            <BsThreeDotsVertical />
                            <div className='App-HomePage-lists-list-underline'></div>
                        </div>
                    </div>
                </>
                :
                <>
                    <h2>{stateList.name}</h2>
                    <div className='App-ListPage-lists'>
                        {tasks.map((item, i) => (<div key={i} className='App-ListPage-lists-list'>
                            <p>{item.value}</p>
                            {/* <img> urgent  with react-icons </img> */}
                            <div>
                                <CiCircleRemove size={20} onClick={() => { removeList(item.id) }} />
                                <CiEdit size={23} onClick={() => { setEdit(item) }} />
                            </div>
                            <div className='App-ListPage-lists-list-underline'></div>
                        </div>))}
                        <div className='App-ListPage-lists-newList' /* onClick={navigate("")} */>

                            <input type="text" placeholder="New Task..." value={input} onChange={handleChange} onKeyDown={handleKeyDown} />
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