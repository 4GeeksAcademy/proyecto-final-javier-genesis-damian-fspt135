import { useEffect, useState } from "react";
import { getForos } from "../../services/createForoService";
import { Await } from "react-router-dom";

export const CreateFeed = () =>{
    const [foros, setforos] = useState([])
    const [loanding, setloanding] = useState(true)

    useEffect(() => {
        loadForos()
    },[]);

    const loadForos = async () => {
        try {
            const data = await getForos()
            console.log("FOROS:", data);
            setforos(data);

            
        } catch (error) {
            console.log(error);
            
        }
    } 

     if (loanding) {
         return <h3>Cargando......</h3>
     }
       

    return(

         <div className="container">

            <h1>Feed</h1>

            {
                foros.map((foro) => (

                    <div
                        key={foro.id}
                        className="card mb-3"
                    >

                        <div className="card-body">

                            <h3>{foro.title}</h3>

                            <p>{foro.description}</p>

                        </div>

                    </div>

                ))
            }

        </div>
    );
};