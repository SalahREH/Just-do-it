
import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router';


function HomePage() {

  let [lists, setLists] = useState([]);
  let [input, setInput] = useState("")
  let navigate = useNavigate()
  let listObj = {
    name: "Lista de la compra",
    tasks: ["cebolla", "patatas", "detergente", "leche"]
  };


  const handleChange = e => {
    setInput(e.target.value)
  }

  const handleKeyDown = e => {
    if (e.keyCode == 13) {
      lists.push({ name: e.target.value, tasks: [] })
      setLists(lists)
      localStorage.setItem("lists", JSON.stringify(lists))
      setInput('')
    }
  }

  useEffect(() => {
    (function pushinarr() {
      let arr = []
      for (let index = 0; index < 3; index++) {
        arr.push(listObj)
      }
      setLists(arr)
    })()
  }, [])

  return (
    <div className='App-HomePage'>
      <h2>Home</h2>
      <div className='App-HomePage-lists'>
        {lists.map((item, i) => (<div key={i} className='App-HomePage-lists-list'>
          <p onClick={() => { navigate("/List", { state: item }) }}>{item.name}</p>
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

export default HomePage