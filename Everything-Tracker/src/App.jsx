import React, { useState, useEffect } from 'react';
import Header from './Header';
import Tracker_input from './Tracker_input.jsx';
import Tracker_list from './Tracker_list.jsx';
import { supabase } from './supabaseClient';

function App() {
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        async function fetchTasks() {
            let { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('id', { ascending: true });
            if (error) {
                console.error('Error loading tasks:', error);
            } else {
                setTasks(data);
            }
        }
        fetchTasks();
    }, []);


    async function addTask(newTask) {
        const taskToInsert = {
            title: newTask.title || '',
            company: newTask.company || '',
            date: newTask.date || null,
            deadline: newTask.deadline || null,
            link: newTask.link || '',
            selected: newTask.selected || '',
            statusindex: newTask.statusindex || 0,
        };

        const { data, error } = await supabase
            .from('tasks')
            .insert([taskToInsert])
            .select();

        if (error) {
            console.error('Error adding task:', error.message, error.details, error.hint);
        } else {
            setTasks((prev) => [...prev, data[0]]);
        }
    }


    async function deleteTask(taskId) {
        const { error } = await supabase.from('tasks').delete().eq('id', taskId);
        if (error) {
            console.error('Error deleting task:', error);
        } else {
            setTasks((prev) => prev.filter((task) => task.id !== taskId));
        }
    }


    async function updateTask(updatedTask) {
        console.log("Task to update:", updatedTask);

        const { id, title, company, date, deadline, link, selected, statusindex } = updatedTask;

        if (!id) {
            console.error("No id provided! Cannot update task.");
            return;
        }

        const { data, error } = await supabase
            .from('tasks')
            .update({ title, company, date, deadline, link, selected, statusindex })
            .eq('id', id)
            .select('*');

        console.log("Update result:", data, error);

        if (error) {
            console.error('Error updating task:', error);
        } else {
            setTasks((prev) => prev.map((task) => (task.id === id ? data[0] || { ...task, ...updatedTask } : task)));
        }
    }


    return (
        <div className="App">
            <Header />
            <>
                <Tracker_input addTask={addTask} />
                <Tracker_list tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
            </>
        </div>
    );
}

export default App;

