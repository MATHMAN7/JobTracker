import { useState } from 'react';

function Tracker_input({ addTask }) {
    const [text, setText] = useState('');

    function handleAdd() {
        if (text.trim() === '') return;


        const newTask = {
            id: Date.now().toString(),
            title: text.trim(),
            company: '',
            date: null,
            deadline: null,
            link: '',
            selected: null,
            statusIndex: 0,
        };

        addTask(newTask);
        setText('');
    }

    return (
        <div className="container">
            <button className="button" onClick={handleAdd}>
                Add
            </button>
            <input
                type="text"
                placeholder="Job Title"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="input"
            />
        </div>
    );
}

export default Tracker_input;


