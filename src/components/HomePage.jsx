
import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';



function HomePage() {

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
      localStorage.setItem("lists", JSON.stringify(lists))
      setInput('')
    }
  }

  const removeList = id => {
    let newArr = [...lists].filter(list => list.id != id)
    setLists(newArr)
  }

  const handleEditChange = e => {
    
  }

  const handleEditKeyDown = e => {
    if (e.keyCode == 13) {
      edit.name = e.target.value

    //   // setLists(lists => lists.map(item => (item.id === newValue.id) ? newValue : item))
      setEdit({ id: null })
    }
  }




  useEffect(() => {
    (function pushinarr() {
      let arr = []
      for (let index = 0; index < 3; index++) {
        let listObj = {
          id: uuidv4(),
          name: "Lista de la compra",
          tasks: [{id: uuidv4(), value: "cebolla"},{id: uuidv4(), value: "patatas"}, {id: uuidv4(), value: "detergente"}, {id: uuidv4(), value: "leche"}]
        };
        arr.push(listObj)
      }
      setLists(arr)
    })()
  }, [])


  return (
    <div className='App-HomePage'>

      {edit.id ?
        <>
          <h2>Changing the name...</h2>
          <div className='App-HomePage-lists'>
            <div className='App-HomePage-lists-newList'>
              <input type="text" placeholder="New name..." onKeyDown={handleEditKeyDown} />

              <BsThreeDotsVertical />
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
              <BsThreeDotsVertical onClick={() => { setEdit(item) }} />
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