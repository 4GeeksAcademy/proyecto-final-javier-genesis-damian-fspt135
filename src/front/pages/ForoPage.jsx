import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";



export const ForoPage = (foro) => {

    return (
        <div>
            <div>
                <div>
                    <img src={foro.img || logo}
                        alt={foro.title} />
                </div>
                <div>
                    <h1>{foro.title}</h1>
                </div>
                <div>
                    <button>
                        like
                    </button>
                </div>
            </div>
            <div>
                <input type="text" placeholder="Buscar"/>
            </div>
            <div>
                {/* aqui van los post */}
            </div>
            <div>
                <button>
                    Back home
                </button>
                <button>
                    Publicar
                </button>
            </div>
        </div>
    )

}