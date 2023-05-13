'use-strict'

const line = require('@line/bot-sdk');
const express = require('express');
const configGet = require('config');


// Line config
const configLine = {
    channelAccessToken:configGet.get('CHANNEL_ACCESS_TOKEN'),
    channelSecret:configGet.get('CHANNEL_SECRET')
};

// Azure Text Sentiment
const endpoint = configGet.get('ENDPOINT');
const apiKey = configGet.get('TRANSLATOR_API_KEY');

const client = new line.Client(configLine);

const app = express();

const port = process.env.PORT || process.env.port || 3000;

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});

app.post('/callback', line.middleware(configLine), (req, res)=>{
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result)=>res.json(result))
        .catch((err)=>{
            console.error(err);
            res.status(500).end();
    });
});

function handleEvent(event){
    if(event.type !== 'message' || event.message.type !== 'text'){
        return Promise.resolve(null);
    }

    const echo = {
        type:'text',
        text:event.message.text
    };

    return client.replyMessage(event.replyToken, echo);
}