/* eslint-disable react/prop-types */
import useData from "./DataProvider";

export default function SettingsButtons( {position} ){

    const { material_principal, setMaterialPrincipal  } = useData()


    const handleClickPrincipal = (e) => {
        e.stopPropagation()
        const newMaterial = e.currentTarget.value
        setMaterialPrincipal(newMaterial)
    }

    const listMaterialPrincipal = material_principal.names.map((material)=>{
        return (
            <button onClick={handleClickPrincipal} key={material} value={material} className={`setting-btn-${position}`}>
                <img src={`./${material}.jpg`}/>
            </button>
        )
    })


    return(
        <div className={`setting-btns-container-${position}`}>
            {listMaterialPrincipal}
        </div>
    )
}