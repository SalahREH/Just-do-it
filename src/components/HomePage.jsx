
import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { CiCircleRemove, CiEdit } from "react-icons/ci";


function HomePage() {
  let localStorList = JSON.parse(localStorage.getItem("lists"))
  let [lists, setLists] = useState([]);
  let [input, setInput] = useState("")
  let [edit, setEdit] = useState({ id: null })
  let navigate = useNavigate()



  const handleChange = e => {
    setInput(e.target.value)
  }

  const handleKeyDown = e => {
    if (!e.target.value || /^\s*$/.test(e.target.value)) {
      return
    }

    if (e.keyCode == 13) {
      lists.push({ id: uuidv4(), name: e.target.value, tasks: [] })
      setLists(lists)
      updateLocalStorage(lists)
      setInput('')
    }
  }

  const removeList = id => {
    let newArr = [...lists].filter(list => list.id != id)
    setLists(newArr)

    updateLocalStorage(newArr)
  }


  const handleEditKeyDown = e => {
    if (!e.target.value || /^\s*$/.test(e.target.value)) {
      return
    }

    if (e.keyCode == 13) {
      edit.name = e.target.value
      // setLists(lists => lists.map(item => (item.id === newValue.id) ? newValue : item))
      setEdit({ id: null })
      updateLocalStorage(lists)
    }
  }

  const updateLocalStorage = (item) => {
    localStorage.setItem("lists", JSON.stringify(item))
  }



  useEffect(() => {
    if (localStorList) setLists(localStorList)
  }, [])


  return (
    <div className='App-HomePage'>

      {edit.id ?
        <>
          <h2>Changing the name...</h2>
          <div className='App-HomePage-lists'>
            <div className='App-HomePage-lists-newList'>
              <input type="text" placeholder={edit.name} onKeyDown={handleEditKeyDown} />
              <CiEdit size={23} />
              <div className='App-HomePage-lists-list-underline'></div>
            </div>
          </div>
        </>
        :
        <>
          <h2>Home</h2>
          <div className='App-HomePage-lists'>
            {lists.map((item, i) => (<div key={i} className='App-HomePage-lists-list'>
              <p onClick={() => { navigate("/List", { state: item }) }}>{item.name}</p>
              {/* <img> urgent with react-icons </img> */}
              <div>
                <CiCircleRemove size={20} onClick={() => { removeList(item.id) }} />
                <CiEdit size={23} onClick={() => { setEdit(item) }} />
              </div>

              <div className='App-HomePage-lists-list-underline'></div>
            </div>))}
            <div className='App-HomePage-lists-newList'>
              <input type="text" placeholder="New List..." value={input} onChange={handleChange} onKeyDown={handleKeyDown} />
              <BsThreeDotsVertical />
              <div className='App-HomePage-lists-list-underline'></div>
            </div>
          </div>
        </>}
    </div>
  )
}

export default HomePage