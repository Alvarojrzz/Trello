import React, { useState, useEffect } from 'react';

const HomeContents = () => {
  const [newTask, setNewTask] = useState('');
  const [difficulty, setDifficulty] = useState('Fácil');
  const [time, setTime] = useState('');
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTodoTasks(JSON.parse(localStorage.getItem('todoTasks')) || []);
    setInProgressTasks(JSON.parse(localStorage.getItem('inProgressTasks')) || []);
    setDoneTasks(JSON.parse(localStorage.getItem('doneTasks')) || []);
  }, []);

  useEffect(() => localStorage.setItem('todoTasks', JSON.stringify(todoTasks)), [todoTasks]);
  useEffect(() => localStorage.setItem('inProgressTasks', JSON.stringify(inProgressTasks)), [inProgressTasks]);
  useEffect(() => localStorage.setItem('doneTasks', JSON.stringify(doneTasks)), [doneTasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '' && time.trim() !== '') {
      const newTaskObj = { nombre: newTask, dificultad: difficulty, tiempo: time };
      const updatedTasks = [...todoTasks, newTaskObj];
      setTodoTasks(updatedTasks);
      localStorage.setItem('todoTasks', JSON.stringify(updatedTasks));
      setNewTask('');
      setDifficulty('Fácil');
      setTime('');
      setIsModalOpen(false);
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...todoTasks];
    updatedTasks.splice(index, 1);
    setTodoTasks(updatedTasks);
    localStorage.setItem('todoTasks', JSON.stringify(updatedTasks));
  };
  
  const handleStartTask = (index) => {
    const taskToMove = todoTasks[index];
    const updatedTodo = [...todoTasks];
    updatedTodo.splice(index, 1);
    setTodoTasks(updatedTodo);
    setInProgressTasks([...inProgressTasks, taskToMove]);
    localStorage.setItem('todoTasks', JSON.stringify(updatedTodo));
    localStorage.setItem('inProgressTasks', JSON.stringify([...inProgressTasks, taskToMove]));
  };
  
  const handleCompleteTask = (index) => {
    const taskToMove = inProgressTasks[index];
    const updatedInProgress = [...inProgressTasks];
    updatedInProgress.splice(index, 1);
    setInProgressTasks(updatedInProgress);
    setDoneTasks([...doneTasks, taskToMove]);
    localStorage.setItem('inProgressTasks', JSON.stringify(updatedInProgress));
    localStorage.setItem('doneTasks', JSON.stringify([...doneTasks, taskToMove]));
  };

  return (
    <div className="p-8 min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold">MI TABLERO</h2>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
          Agregar Tarea
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 shadow-lg w-96 rounded-3xl">
            <h3 className="text-xl font-extrabold mb-4 text-center font-mono">Nueva Tarea</h3>
            <input 
              type="text" 
              value={newTask} 
              onChange={(e) => setNewTask(e.target.value)} 
              placeholder="Escribe la tarea..." 
              className="w-full p-2 border rounded mb-3 bg-gray-100"
            />
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)} 
              className="w-full p-2 border rounded mb-3 bg-gray-100"
            >
              <option value="Fácil">Fácil</option>
              <option value="Medio">Medio</option>
              <option value="Difícil">Difícil</option>
            </select>
            <input 
              type="text" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              placeholder="Tiempo estimado (ej: 30 min)" 
              className="w-full p-2 border rounded mb-4 bg-gray-100"
            />
            <div className="flex gap-2 items-center justify-between">
              <button onClick={handleAddTask} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                Agregar
              </button>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-600">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 overflow-x-auto">
        <div className="flex-1 bg-gray-600 p-4 rounded shadow min-w-[300px]">
          <h3 className="mb-3 text-white font-mono font-extrabold">POR HACER</h3>
          <div className="space-y-3">
            {todoTasks.map((task, index) => (
               <div key={index} className="bg-white p-3 rounded shadow hover:shadow-lg transition-shadow duration-200 flex justify-between items-center">
               <span>{task.nombre} - {task.dificultad} - {task.tiempo}</span>
               <div className="flex gap-2">
                   <button 
                   onClick={() => handleStartTask(index)} 
                   className="bg-yellow-300 text-white px-2 py-1 rounded text-xs">
                   ➡️ Comenzar
                   </button>
                   <button 
                   onClick={() => handleCompleteTask(index)} 
                   className="bg-green-300 text-white px-2 py-1 rounded text-xs">
                   ✅ Completar
                   </button>
                   <button 
                   onClick={() => handleDeleteTask(index)} 
                   className="bg-red-300 text-white px-2 py-1 rounded text-xs">
                   ❌ Eliminar
                   </button>
               </div>
               </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-gray-600 p-4 rounded shadow min-w-[300px]">
          <h3 className="mb-3 text-white font-mono font-extrabold">EN PROCESO</h3>
          <div className="space-y-3">
            {inProgressTasks.map((task, index) => (
               <div key={index} className="bg-white p-3 rounded shadow hover:shadow-lg transition-shadow duration-200 flex justify-between items-center">
               <span>{task.nombre} - {task.dificultad} - {task.tiempo}</span>
               <div className="flex gap-2">
                   <button 
                   onClick={() => handleStartTask(index)} 
                   className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                   ➡️ Comenzar
                   </button>
                   <button 
                   onClick={() => handleCompleteTask(index)} 
                   className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                   ✅ Completar
                   </button>
                   <button 
                   onClick={() => handleDeleteTask(index)} 
                   className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                   ❌ Eliminar
                   </button>
               </div>
               </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-gray-600 p-4 rounded shadow min-w-[300px]">
          <h3 className="mb-3 text-white font-mono font-extrabold">REALIZADAS</h3>
          <div className="space-y-3">
            {doneTasks.map((task, index) => (
               <div key={index} className="bg-white p-3 rounded shadow hover:shadow-lg transition-shadow duration-200 flex justify-between items-center">
               <span>{task.nombre} - {task.dificultad} - {task.tiempo}</span>
               <div className="flex gap-2">
                   <button 
                   onClick={() => handleStartTask(index)} 
                   className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                   ➡️ Comenzar
                   </button>
                   <button 
                   onClick={() => handleCompleteTask(index)} 
                   className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                   ✅ Completar
                   </button>
                   <button 
                   onClick={() => handleDeleteTask(index)} 
                   className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                   ❌ Eliminar
                   </button>
               </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContents;
