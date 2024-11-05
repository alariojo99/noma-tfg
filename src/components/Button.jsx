import { useState } from "react"

// eslint-disable-next-line react/prop-types
export default function Button({ icon, handleClick, clas}){
    
    const [isClicked, setIsClicked] = useState(false)

    const btnStyle = {
            backgroundColor: isClicked ? "#D9D9D9" : "white",
    }

    
    return( 
        <button className={clas} style={btnStyle} onClick={() => { setIsClicked(prevIsClicked => !prevIsClicked); handleClick() }}>
                <img src={`./${icon}`} height={"30px"} />
        </button>
    )
}