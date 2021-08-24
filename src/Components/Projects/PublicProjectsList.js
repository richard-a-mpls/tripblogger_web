import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadPublicProjectList} from "../../store/project-slice";
import ProjectPostcard from "./ProjectPostcard";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import {loginRequest} from "../../authConfig";

const PublicProjectsList = () => {
    const dispatch = useDispatch();
    const publicProjectList = useSelector(state => state.projectSlice.publicProjectList);
    const isAuthenticated = useIsAuthenticated();
    const {instance} = useMsal();

    const clickHandler = () => {
        if (isAuthenticated) {

        } else {
            instance.loginPopup(loginRequest).catch(e => {
                console.error(e);
            });
        }
    }

    useEffect(() => {
        dispatch(loadPublicProjectList())
    }, [dispatch]);

    return (
        <>
            {publicProjectList.map((prj) =>
                <ProjectPostcard onClick={clickHandler} project={prj} key={prj._id}/>
            )}
        </>
    );
}

export default PublicProjectsList;