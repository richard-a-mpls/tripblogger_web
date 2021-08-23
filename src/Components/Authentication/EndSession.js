import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {endSession} from "../../store/auth-slice";

const EndSession = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(endSession());
    }, [dispatch]);

    return (
      <p>Ending Session...</p>
    );
}

export default EndSession;