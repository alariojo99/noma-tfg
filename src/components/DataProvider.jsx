/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import data from "../data"

const DataContext = createContext();

export function DataProvider({ children }) {
    
    const [model, setModel] = useState(data[0]) /*Aqui en un futuro cambiarlo con la paginación*/

    const updateCurrentModel = (i) => {
        setModel(data[i])
    }

    const updateCurrentMaterialPrincipal = (newMaterialPrincipal) => {
        setModel((prevModel) => ({
            ...prevModel,
            current_material_principal: newMaterialPrincipal
        }));
    }


    const value = {
        name: model.name,
        glb: model.glb,
        material_principal: model.material_principal,
        current_material_principal: model.current_material_principal,
        setCurrentModel: updateCurrentModel,
        setMaterialPrincipal: updateCurrentMaterialPrincipal, 
        descripcionPrincipal: model.descripcion_principal,
        descripcionSecundaria: model.descripcion_secundaria,
        caracteristicas: model.caracteristicas
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
