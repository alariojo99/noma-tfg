import { useState } from "react"

// eslint-disable-next-line react/prop-types
export default function Button({ icon, handleClick, clas}){
    
    const [isClicked, setIsClicked] = useState(false)

    const btnStyle = {
            backgroundColor: isClicked ? "#D9D9D9" : "white",
            border: "2px solid black",
            width: "50px",
            height: "50px",
    }

    
    return( 
        <button className={clas} style={btnStyle} onClick={() => { setIsClicked(prevIsClicked => !prevIsClicked); handleClick() }}>
                <img src={`src/assets/${icon}`} height={"30px"} />
        </button>
    )
}