import classes from './Button.module.css';

const Button = (props) => {

    let className;
    switch (props.decorator) {
        case 'cancel':
            className = classes.cancel;
            break;
        case 'inactive':
            className = classes.inactive;
            break;
        case 'confirm':
            className = classes.confirm;
            break;
        case 'halfwidth':
            className = classes.halfwidth;
            break;
        case 'fullwidth':
            className = classes.fullwidth;
            break;
        default:
            className = undefined;
    }

    return (
        <div className={classes.buttonwrapper}>
            <button type={props.type} onClick={props.onClick} className={className}>{props.children}</button>
        </div>
    );
}

export default Button;