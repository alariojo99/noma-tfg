/* eslint-disable react/prop-types */
import useData from "./DataProvider";

export default function Info( {className} ){
    
    const {descripcionPrincipal, caracteristicas, name} = useData()
    
    
    return <>
        <div className={className}>
            <h2>{name}</h2> <br/>
            <p dangerouslySetInnerHTML={{ __html: descripcionPrincipal }} /> <br/>
            <p className="price"><b>{caracteristicas.precio}</b></p>
        </div>
    </>
}