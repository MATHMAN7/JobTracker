import Tracker_item from './Tracker_item.jsx';



function Tracker_list({ tasks ,deleteTask}) {

    return (
        <ul className="tracker_list">
            {tasks.map((task, index) => (
                <Tracker_item key={index} text={task} index={index}
                              deleteTask={deleteTask} />
            ))}

        </ul>
    );
}

export default Tracker_list;