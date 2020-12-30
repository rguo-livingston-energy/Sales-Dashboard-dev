import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

function Card(props) {
    return (
        <div className="goal-card">
            <h4>Progress VS. Goal</h4>
            <br />
            <p>Total Ports Sold:  {props.totalPorts}</p>
            <p>Ports Remaining to Goal:  {props.remaining}</p>
            <p>Current Goal:  {props.goal} </p>
            <div>
                <Button variant="primary" size="sm" onClick={props.addGoal}>+</Button>{' '}
                <Button variant="secondary" size="sm" onClick={props.subGoal}> - </Button>
            </div>
        </div>
    );
}

export default Card;