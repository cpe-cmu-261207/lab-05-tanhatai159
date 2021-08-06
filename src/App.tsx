import { type } from 'os';
import React from 'react';
import { useState } from 'react'
import Task from './components/Task';
import DoneSec from './components/DoneTasks';

type TaskData = {
  id: number;
  name: string;
}

function App() {

  //use state to collect a Task that user inputs.
  const [curTask, setCurTask] = useState<string>("");
  //use state for collecting not done task to prevent rendering. 
  const [notDoneTask, setNotDoneTask] = useState<TaskData[]>([]);
  //use state for collecting done task to prevent rendering. 
  const [doneTasks, setDoneTask] = useState<TaskData[]>([]);

  //addtask Function
  const addTask = (aTask: string) => {
    if(aTask !== ""){
    //generate ID by time.
    const newID = (new Date()).getTime();
    //add new Task to array notDoneTask.
    const newTask = [{id:newID, name:aTask},...notDoneTask];
    setNotDoneTask(newTask);
    }
    else{
      alert("Task can not be empty")
    }

  }

  //doneTask Function
  const doneTask = (Id:number,names:string) => {
    //copy to done task
    const done = [{id:Id, name:names} ,...doneTasks];
    setDoneTask(done);

    //delete to done task
    const newTask = notDoneTask.filter(x => x.id !== Id);
    setNotDoneTask(newTask);
  }

  //deleteTask Function
  const deleteTask = (id:number) =>{
    //ถ้า id ตรงกับที่ input มาก็จะละทิ้งไป
    const newTask = notDoneTask.filter(x => x.id !== id);
    //ใส่ array ใหม่
    setNotDoneTask(newTask);
  }

  //When type
  const onChangeCallback = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setCurTask(ev.target.value);
}

  //When press Enter
  const onKeyDownCallback = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if(ev.key === "Enter") addTask(curTask);
  }

  return (
    <div>

      {/* header section */}
      <div className='flex justify-center items-end space-x-2'>
        <span className='text-center italic my-2 text-2xl'>Minimal Todo List </span>
        <span className='text-gray-400 italic my-2 text-xl'>by 630610732 Tanhatai Klungmajareon</span>
      </div>

      {/* todo section */}
      <div className='mx-auto max-w-4xl'>

        {/* task input and add button */}
        <div className='flex space-x-1'>
          <input className='border border-gray-400 w-full text-2xl'
            onKeyDown={onKeyDownCallback} 
            onChange = {onChangeCallback}></input>
          <button className='border border-gray-400 w-8 font-bold' 
                  onClick = {() => addTask(curTask)}>+</button>
        </div>

        {/* not done */}
        <div>
          {notDoneTask.map(x => <Task id={x.id} name={x.name} doneFn={doneTask} deleteFn={deleteTask}></Task>)}
        </div>

        {/* Done */}
        <div>
          {doneTasks.map(x => <DoneSec id={x.id} name={x.name}></DoneSec>)}
        </div>    

      </div>


      {/* footer section */}
      <p className='text-center text-gray-400'> Copyright © 2021 </p>
    </div>
  );
}

export default App;
