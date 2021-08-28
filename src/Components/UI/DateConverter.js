const DateConverter = (props) => {
    let date = new Date();
    if (props.date !== undefined) {
        date = new Date(props.date);
    }
    const month = date.toLocaleString('en-US', {month: 'long'});
    const day = date.toLocaleString('en-US', {day: '2-digit'});
    const year = date.getFullYear();
    const dateDisplay = month + " " + day + " " + year;

    return dateDisplay
}

export default DateConverter;