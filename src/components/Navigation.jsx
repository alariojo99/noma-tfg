import useData from "./DataProvider";
import data from "../data"
import { useState } from "react";

export default function Navigation(){
    
    const { name, setCurrentModel } = useData()

    const [currentClicked, setCurrentClicked] = useState(0)


    const handleClick = (i, e) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentModel(i)
        setCurrentClicked(i)
    }
    
    const pages = data.map((page, i) => {
        return(
                <button 
                    key={i} 
                    value={i} 
                    className={currentClicked === i ? "pagination-circle active" : "pagination-circle"}
                    onClick={(e)=>handleClick(i,e)}
                >
                </button>
        )
    })

    return(
        <div className="navigation-container">
            <h2>{name}</h2>
            <div className="navigation-container-btns">
                {pages}
            </div>   
        </div>
    )
}