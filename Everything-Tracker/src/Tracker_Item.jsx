import './Tracker_item.css';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Tracker_item({ text: task, deleteTask, updateTask }) {
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState(task.title || "");
    const [company, setCompany] = useState(task.company || "");
    const [date, setDate] = useState(task.date ? new Date(task.date) : null);
    const [deadline, setDeadline] = useState(task.deadline ? new Date(task.deadline) : null);
    const [link, setLink] = useState(task.link || "");
    const [selected, setSelected] = useState(task.selected || null);
    const [statusIndex, setStatusIndex] = useState(task.statusindex || 0);

    const statuses = [
        "Waiting⏳",
        "Accepted✅",
        "Rejected❌",
        "I Rejected🙅‍♂️",
        "Closed🔒",
        "Interview💼",
        "Ghosted👻",
    ];

    const cycleStatus = () => {
        if (!isEditing) return;
        setStatusIndex((prevIndex) => (prevIndex + 1) % statuses.length);
    };

    const cycleStatus_Back = () => {
        if (!isEditing) return;
        setStatusIndex((prevIndex) => (prevIndex - 1 + statuses.length) % statuses.length);
    };

    const handleClick = (value) => {
        if (!isEditing) return;
        setSelected(selected === value ? null : value);
    };

    const handleSave = () => {
        setIsEditing(false);
        updateTask({
            id: task.id,
            title,
            company,
            date: date ? date.toISOString() : null,
            deadline: deadline ? deadline.toISOString() : null,
            link,
            selected,
            statusindex: statusIndex,
        });
    };


    return (
        <div className="tracker-card">
            <div className="tracker_item">
                {isEditing ? (
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="tracker-title-input"
                    />
                ) : (
                    <div className="tracker-title-view">{title || "Untitled"}</div>
                )}

                {isEditing ? (
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company name"
                        className="tracker-company-input"
                    />
                ) : (
                    <div className="tracker-company-view">{company || "__________"}</div>
                )}

                <div className="remote">
                    {["op1", "op2", "op3"].map((op) => (
                        <div className="remote-option" key={op}>
                            <input
                                id={`${op}-${task.id}`}
                                className={op}
                                type="checkbox"
                                name={`group-${task.id}`}
                                checked={selected === op}
                                onChange={() => handleClick(op)}
                            />
                            <label htmlFor={`${op}-${task.id}`}>
                                {op === "op1" ? "In person" : op === "op2" ? "Remote" : "Hybrid"}
                            </label>
                        </div>
                    ))}
                </div>

                <label className="link">
                    Link:
                    {isEditing ? (
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder=" https://example.com"
                        />
                    ) : link ? (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="link-view">
                            {link}
                        </a>
                    ) : (
                        <span className="link-view">__________</span>
                    )}
                </label>

                <div className="Dates">
                    <label className="d2">
                        Date:
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="DD/MM/YYYY"
                            disabled={!isEditing}
                        />
                    </label>

                    <label className="d1">
                        Deadline:
                        <DatePicker
                            selected={deadline}
                            onChange={(date) => setDeadline(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="DD/MM/YYYY"
                            disabled={!isEditing}
                        />
                    </label>
                </div>
            </div>

            <div className="status">
                <button onClick={cycleStatus_Back} disabled={!isEditing}>
                    ◀
                </button>
                <span className="status2">{statuses[statusIndex]}</span>
                <button onClick={cycleStatus} disabled={!isEditing}>
                    ▶
                </button>
            </div>

            <div className="save-delete">
                <button
                    onClick={() => {
                        if (isEditing) {
                            handleSave();
                        } else {
                            setIsEditing(true);
                        }
                    }}
                    className="edit-button"
                >
                    {isEditing ? "Save" : "Edit"}
                </button>

                <button onClick={() => deleteTask(task.id)} className="delete-button">
                    🗑️ Delete
                </button>
            </div>
        </div>
    );
}

export default Tracker_item;
