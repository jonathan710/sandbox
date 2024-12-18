"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect,useState, useRef  } from "react";

export default function Home() {

  const [list, setList]= useState([]);
  const [text,setText]= useState(" ");

  // Load the list from local storage when the component mounts 
  useEffect(() => { 
    const storedList = localStorage.getItem("todoList");
      if (storedList) { 
        setList(JSON.parse(storedList)); 
      } 
    }, []); 
    
  // Save the list to local storage whenever it changes 
  useEffect(() => { 
    localStorage.setItem("todoList", JSON.stringify(list)); 
  }, [list]);

  
 const handleSubmit = () => {
  const newitem = {
    text : text,
    checked : false
  }
  setList([ ...list, newitem]);
  setText('');
};

const handleCheckBox =(target)=>{
  const newList = list.map((item, i) => {
    if(i === target){
      return { ...item, checked: !item.checked };
    }
    return item;
  });
  setList(newList);
}

const handleDelete = (i) => { 
  const newList = [...list.slice(0, i), ...list.slice(i + 1)];
  console.log(newList)
  setList(newList); 
};

  return (
      <div style={{display:"flex", borderRadius:"10px", flexDirection:"column", margin:"0 auto", width:"50%",maxWidth:"500px",padding:"10px", background:"white", color:"black",position:"absolute", top:"50%", left:"50%", transform:"translate(-50% , -50%)",overflow:"hidden"}}>
        <div style={{display:"flex", flexDirection:"row",fontWeight:"bold"}}>To-Do list <img src="#"/></div>
        <div style={{display:"flex", flexDirection:"row", padding:"10px 0"}}>
          <input style={{width:"80%",border:"0px", color:"#333", background:"#eaedee"}} 
          onChange={(e)=>{setText(e.target.value)}} value={text} className={styles.inputtextbox} placeholder="Add your text" />
          <button onClick={handleSubmit} style={{width:"20%", color:"white", background:"#FF5722", border:"0px", borderRadius:"15px",marginLeft:"-12px",padding:"5px"}}>Add</button>
        </div>

        {list.map((item, i) => ( 
          <div key={i} style={{display:"flex", flexDirection:"row"}}> 
          
            <input type="checkbox" className={styles.checkBox} onClick={()=>handleCheckBox(i)}/>
            
              <div style={ {textDecorationLine : item.checked ? "line-through" : "none"}}>{item.text}</div>
            <button style={{marginLeft:"auto",background:"none", color:"black",border :"none"}} onClick={() => handleDelete(i)}>&#10006;</button>
          </div>

        ))}

      </div>
  );
}
