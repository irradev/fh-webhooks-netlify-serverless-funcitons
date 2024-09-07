import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {

    const myImportatnVariable = process.env.MY_IMPORTANT_VARIABLE || '';

   
    console.log('Hola mundo desde los logs de Netlify');

    return {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            myImportatnVariable: myImportatnVariable
        }),
        statusCode: 200,
    }
}