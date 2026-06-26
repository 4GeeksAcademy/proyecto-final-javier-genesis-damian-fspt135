import { useState } from "react";
import { getForos } from "../../../services/foroService.js"
import useGlobalReducer from "../useGlobalReducer.jsx";

export const useForo = () =>{
    const { store, dispatch } = useGlobalReducer();

    const getDataForo = async () =>{
        try{
            const foroList = await getForos(dispatch);
        }catch (err) {
            setError(err.message || "Error en enlistar foros");
        }
    };

    return{
        getDataForo
    }
}

