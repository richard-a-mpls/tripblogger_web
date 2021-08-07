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
        console.log(event.target.id);
        setValue(event.target.id);
        props.onUpdate(props.attribute, event.target.id);
    };

    useEffect(() => {

        console.log(props.value);
        setValue(props.value);
    }, [props.value]);

    if (props.type === 'button-selector') {
        return (
            <div>
                <div style={{width: "150px", display: "inline-block"}}>
                    <label>{props.label}</label>
                </div>
                <div style={{display: "inline-block"}}>
                    {props.options.map((opt) =>
                        <label key={opt.value} style={{display: "inline-block"}} id={opt.value} onClick={updateButtonSelectorHandler}
                               className={value === opt.value ? "active" : "inactive"}>{opt.label}</label>
                    )}
                </div>
            </div>
        )
    }


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
            <input type="text" className={props.className} onChange={valueChangeHandler} value={value}/>
            }
        </>
    );
}

export default Input;