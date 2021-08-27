import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {endSession} from "../../store/auth-slice";

const EndSession = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(endSession());
    }, [dispatch]);

    return (
        <i className="fullspinner fas fa-cog fa-spin"/>
    );
}

export default EndSession;