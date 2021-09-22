import React, {useEffect, useState} from "react";
import classes from './Input.module.css';

const Input = (props) => {

    const [value, setValue] = useState('');

    const valueChangeHandler = (event) => {
        setValue(event.target.value);
        props.onUpdate(props.attribute, event.target.value);
    }

    const sliderChangeHandler = (event) => {
        setValue(prevState => {
            setValue(!prevState);
            props.onUpdate(props.attribute, !prevState);
            if (props.onUpdate2) {
                props.onUpdate2(!prevState);
            }
        });
    };

    useEffect(() => {
        if (props.value || props.dateValue) {
            setValue(props.dateValue ? props.dateValue : props.value);
        }
    }, [props.value, props.dateValue]);

    const className = (props.className === 'summary')?classes.summary:undefined;

    if (props.type === 'slider') {
        return (
            <>
                <div style={{width: "100px", display: "inline-block"}}>
                    <label>Published:</label>
                </div>
                <div style={{display: "inline-block"}}>
                    <span style={{verticalAlign: 'top', display: 'inline-block'}}>
                        <label className={classes.switch}>
                            <input type="checkbox" defaultChecked={props.value}
                                   onChange={sliderChangeHandler}/>
                            <span className={`${classes.slider} ${classes.round}`}></span>
                        </label>
                    </span>
                </div>
            </>
        );
    }

    return (
        <>
            {!props.editing && <label className={className}>{props.value}</label>}
            {props.editing &&
            <input placeholder={props.placeholder} type={props.type ? props.type : "text"} className={className}
                   onChange={valueChangeHandler} value={value}/>
            }
        </>
    );
}

export default Input;