import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const state1 = {
        "name": "Nadya",
        "class": "B.ed HONS in Education ",
    }
    const [state, setState] = useState(state1);
    const update = () => {
        setTimeout(() => {
            setState({
              "name": "Nads",
              "class": "B.ed HONS in Computer Science",
            });
            
        }, 1000)
    }
    return (
        <NoteContext.Provider value={{state:state, update:update}}>
            {props.children}
        </NoteContext.Provider>
    );
    
}

export default NoteState;