import Tracker_item from './Tracker_item.jsx';

function Tracker_list({ tasks, deleteTask, updateTask }) {
    return (
        <ul className="tracker_list">
            {tasks.map((task) => (
                <Tracker_item
                    key={task.id}
                    text={task}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                />
            ))}
        </ul>
    );
}

export default Tracker_list;
