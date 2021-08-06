import {useState} from "react";

type TaskProps = {
    id: number;
    name: string;
    doneFn: Function;
    deleteFn: Function; 
}

const Task = ({id, name, doneFn, deleteFn}: TaskProps) => {
    
    const [style, setStyle] = useState({display: 'none'});

    return (
        <div
        className="flex justify-between h-8 items-center py-6 border-b"
        onMouseEnter = {() => {setStyle({display: 'block'})}}
        onMouseLeave = {() => {setStyle({display: 'none'})}}
      >
        <span className="text-2xl">{name}</span>
        <div className="flex space-x-1 items-center">
          <button className="bg-green-400 w-24 text-2xl" onClick = {() => doneFn(id,name)} style = {style}>Done</button>
          <button className="bg-red-400 w-24 text-2xl" onClick = {() => deleteFn(id)} style ={style}>Delete</button>
        </div>
      </div>
    );
}

export default Task;