import classes from './Spinner.module.css';

const Spinner = () => {
    return (
        <main>
            <div className={classes.spinner}>
                <i className={`${classes.fullspinner} fas fa-cog fa-spin`}/>
            </div>
        </main>
    );
}

export default Spinner;