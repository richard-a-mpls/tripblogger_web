
import classes from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={classes.spinner}>
            <i className="fullspinner fas fa-cog fa-spin"/>
        </div>
    // <div style={{marginTop: "100px", width: "100%", textAlign: "center", display: "block"}}>
    //     <i className="fullspinner fas fa-cog fa-spin"/>
    // </div>
    );
}

export default Spinner;