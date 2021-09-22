import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {endSession} from "../../store/auth-slice";
import Spinner from "../UI/Spinner";

const EndSession = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(endSession());
    }, [dispatch]);

    return (
        <Spinner/>
    );
}

export default EndSession;