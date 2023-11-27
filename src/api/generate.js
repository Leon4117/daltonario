import { Configuration, OpenAIApi } from "openai";
//import { resolve } from "styled-jsx/css";

const configuration = new Configuration({
    apiKey: "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",

})
const openai = new OpenAIApi(configuration)

export default async function (req, res){
    if(!configuration.apiKey){
        res.status(500).json({
            error:{
                message: "No fue configurada una API key"
            }
        })
        return
    }

    const query = req.body.query || '';
    if(query.trim().length === 0){
        res.status(400).json({
            error: {
                message: "Escribe una busqueda",
            }
        })
    }

    try{

        const completion = await openai.createCompletion({
            //model: "gpt-3.5-turbo-0301",//en pruebas
            model: "text-davinci-003",
            //prompt: "###Postgres SQL tablas, con las propiedades: ##Cliente(id,nombre,direccion)#Paquete(id,clave,idC)###Dime una query que busque paquetes que tenga clientes por el nombre Leonardo",
            prompt: generaPregunta(query),
            //prompt: query,
            temperature: 0,
            max_tokens: 150,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["#", ";"],
        })
        res.status(200).json(completion.data.choices[0].text)
    }catch(error){
        if(error.response){
            console.error(error.response.status, error.response.data)
            res.status(error.response.status).json(error.response.data)
        }else{
            console.error(`Error con OpenAI API request: ${error.message}`)
            res.status(500).json({
                error: {
                    message: 'Ocurrió un error en tu búsqueda',
                }
            })
        }
    }

}

function generaPregunta(query, cadena){
    const final = "Dame el concepto y la traducción en ingles de: " +
    query

    return final
}
