import './Tracker_item.css';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Tracker_item({ text, index, deleteTask }) {
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState(text.title || "");
    const [company, setCompany] = useState("");
    const [date, setDate] = useState(null);
    const [deadline, setDeadline] = useState(null);
    const [link, setLink] = useState("");
    const [selected, setSelected] = useState(null);
    const [Statusindex, setStatusIndex] = useState(0);

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
        if (selected === value) {
            setSelected(null);
        } else {
            setSelected(value);
        }
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
                    <div className="remote-option">
                        <input
                            id="op1"
                            className="op1"
                            type="checkbox"
                            name="group"
                            checked={selected === "op1"}
                            onChange={() => handleClick("op1")}
                        />
                        <label htmlFor="op1">In person</label>
                    </div>

                    <div className="remote-option">
                        <input
                            id="op2"
                            className="op2"
                            type="checkbox"
                            name="group"
                            checked={selected === "op2"}
                            onChange={() => handleClick("op2")}
                        />
                        <label htmlFor="op2">Remote</label>
                    </div>

                    <div className="remote-option">
                        <input
                            id="op3"
                            className="op3"
                            type="checkbox"
                            name="group"
                            checked={selected === "op3"}
                            onChange={() => handleClick("op3")}
                        />
                        <label htmlFor="op3">Hybrid</label>
                    </div>
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
                    ) : (

                        link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="link-view">
                                {link}
                            </a>
                        ) : (
                            <span className="link-view">__________</span>
                        )
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
                <button onClick={cycleStatus_Back} disabled={!isEditing}>◀</button>
                <span className="status2">{statuses[Statusindex]}</span>
                <button onClick={cycleStatus} disabled={!isEditing}>▶</button>
            </div>

            <div className="save-delete">

            <button onClick={() => setIsEditing(prev => !prev)} className="edit-button">
                {isEditing ? "Save" : "Edit"}
            </button>

            <button onClick={() => deleteTask(index)} className="delete-button">🗑️ Delete</button>
            </div>
        </div>
    );
}

export default Tracker_item;
