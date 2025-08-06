import React, { useState } from 'react';
import Tracker_item from './Tracker_item.jsx';



function Tracker_input({ addTask }) {
    const [text, setText] = useState('')



        function handleAdd() {
            if (text.trim() === '') return;
            addTask({ title: text });
            setText('');
        }

        return (
            <div className="container">
                <button className="button" onClick={handleAdd}>Add</button>
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
