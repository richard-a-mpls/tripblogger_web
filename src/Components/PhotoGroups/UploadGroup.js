import React, {useState} from "react";
import ImageUpload from "./ImageUpload";

const UploadGroup = (props) => {

    const [imageData, setImageData] = useState([]);

    const setPhotoDataHandler = (event) => {

        const tmpArray = [];
        for (let counter = 0; counter < event.target.files.length; counter++) {
            tmpArray.push({key: counter, data: event.target.files[counter]});
        }
        setImageData(tmpArray);
    }

    return (
        <div className="wb-form-control">
            {imageData.map((data) =>
                <div className="addphoto"
                     style={{paddingBottom: "5px", paddingRight: "5px", height: "155px", verticalAlign: "middle"}}>
                    <ImageUpload key={data.key} projectId={props.projectId} data={data.data}/>
                </div>
            )}
            <div className="addphoto" style={{
                display: "inline-block",
                textAlign: "center",
                backgroundColor: "#26567b",
                borderRadius: '16px',
                height: "150px",
                paddingRight: "5px",
                paddingBottom: "5px",
                verticalAlign: "middle"
            }}>
                <label htmlFor="file" className="inputfile">
                    <span style={{display: "block"}}><i className="showcase fas fa-image"/></span>
                    <span style={{display: "block", color: "#ffffff"}}>+ Add Photos</span>
                </label>
                <input id="file" className="inputfile" type="file" multiple="multiple"
                       onChange={setPhotoDataHandler}/>

            </div>

        </div>
    );
}
export default UploadGroup;