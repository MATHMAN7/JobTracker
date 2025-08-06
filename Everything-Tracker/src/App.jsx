import React, { useState, useEffect } from 'react';
import Header from './Header';
import Tracker_input from './Tracker_input.jsx';
import Tracker_list from './Tracker_list.jsx';

function App() {

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tracker_tasks');
        return saved ? JSON.parse(saved) : [];
    });

    
    useEffect(() => {
        localStorage.setItem('tracker_tasks', JSON.stringify(tasks));
    }, [tasks]);

    function addTask(newTask) {
        setTasks([...tasks, newTask]);
    }

    function deleteTask(indexToRemove) {
        setTasks((prevTasks) =>
            prevTasks.filter((_, index) => index !== indexToRemove)
        );
    }

    return (
        <div className="App">
            <Header />
            <>
                <Tracker_input addTask={addTask} />
                <Tracker_list tasks={tasks} deleteTask={deleteTask} />
            </>
        </div>
    );
}

export default App;

