import React, {useEffect, useState} from "react";

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

    const updateButtonSelectorHandler = (event) => {
        setValue(event.target.id);
        props.onUpdate(props.attribute, event.target.id);
    };

    useEffect(() => {
        if (props.value || props.dateValue) {
            setValue(props.dateValue ? props.dateValue : props.value);
        }
    }, [props.value, props.dateValue]);

    if (props.type === 'slider') {
        return (
            <>
                <div style={{width: "150px", display: "inline-block"}}>
                    <label>Published:</label>
                </div>
                <div style={{display: "inline-block"}}>
                                <span style={{verticalAlign: 'middle', display: 'inline-block', lineHeight: '30px'}}>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked={props.value}
                                           onChange={sliderChangeHandler}/>
                                    <span className="slider round"></span>
                                </label>
                                </span>
                </div>
            </>
        );
    }

    return (
        <>
            {!props.editing && <label className={props.className}>{props.value}</label>}
            {props.editing &&
            <input placeholder={props.placeholder} type={props.type ? props.type : "text"} className={props.className}
                   onChange={valueChangeHandler} value={value}/>
            }
        </>
    );
}

export default Input;