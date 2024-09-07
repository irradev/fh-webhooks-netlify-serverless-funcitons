import type { Handler } from "@netlify/functions";

const notify = async( message: string ) => {
    const body = {
        content: message,
        // embeds: [
        //     {
        //         image: {
        //             url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjlpcWsyaXEyeGhycTZiOXJxNWowNDZ6NHpjYzNmOHNnZGRtaWpiMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PjZh99qBkDuhdGaFaT/giphy.gif',
        //         }
        //     }
        // ]
    }

    try {
        const response = await fetch( process.env.DISCORD_WEBHOOK_URL || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            console.log('Error sending message to discord');
            return false;
        }

        return true;
        
    } catch (error) {
        console.log(error);

        return false;
    }
}


const onStar = (payload: any): string => {

    let message: string = '';
    const { action, sender, repository } = payload;

    message = `Hey ${sender.login}! You ${action} star on ${repository.full_name}!`;

    return message;
}

const onIssue = (payload: any): string => {

    const { action, issue, repository } = payload;

    return `An issue (${issue.title}) was ${action} by ${issue.user.login} on ${repository.full_name}!`;
    
}


export const handler: Handler = async (event, context) => {

    const githubEvent = event.headers['x-github-event'] || 'unknown';
    const payload = JSON.parse(event.body || '{}');

    console.log(payload);

    let message: string = '';

    switch(githubEvent) {
        case 'star': {
            message = onStar(payload);
            break;
        }
        case 'issues': {
            message = onIssue(payload);
            break;
        }
        default: {
            message = 'Unknown event: ' + githubEvent;
            break;
        }
    }

    await notify(message);

    return {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: "done" }),
        statusCode: 200,
    }
}