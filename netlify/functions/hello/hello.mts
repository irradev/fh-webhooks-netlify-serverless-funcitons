import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {


    console.log('Hola mundo desde los logs de Netlify');

    return {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: "Hello World!!" }),
        statusCode: 200,
    }
}