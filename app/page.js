'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title:'', dueDate:'' });

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!form.title) return;
    setTasks([...tasks, { id: Date.now(), ...form, status:'Not Started', progress:0 }]);
    setForm({ title:'', dueDate:'' });
  };

  const updateProgress = (id, progress) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, progress:Number(progress), status:Number(progress)===100 ? 'Completed' : 'In Progress' } : t));
  };

  const overall = tasks.length ? Math.round(tasks.reduce((a,b)=>a+b.progress,0)/tasks.length) : 0;

  return (
    <div style={{padding:'30px',fontFamily:'Arial'}}>
      <h1>Task Manager</h1>
      <p>Overall Progress: {overall}%</p>
      <input placeholder='Task name' value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
      <input type='date' value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})} />
      <button onClick={addTask}>Add Task</button>
      {tasks.map(task => (
        <div key={task.id} style={{border:'1px solid #ccc',marginTop:'10px',padding:'10px'}}>
          <strong>{task.title}</strong><br/>
          Due: {task.dueDate || 'N/A'}<br/>
          Status: {task.status}<br/>
          Progress: {task.progress}%
          <input type='range' min='0' max='100' value={task.progress}
            onChange={e=>updateProgress(task.id,e.target.value)} />
        </div>
      ))}
    </div>
  );
}
