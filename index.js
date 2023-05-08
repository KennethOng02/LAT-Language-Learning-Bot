'use-strict'

const line = require('@line/bot-sdk');
const express = require('express');
const configGet = require('config');
const {TextAnalyticsClient, AzureKeyCredential} = require("@azure/ai-text-analytics");

// Line config
const configLine = {
    channelAccessToken:configGet.get('CHANNEL_ACCESS_TOKEN'),
    channelSecret:configGet.get('CHANNEL_SECRET')
};

// Azure Text Sentiment
const endpoint = configGet.get('ENDPOINT');
const apiKey = configGet.get('TEXT_ANALYTICS_API_KEY');

const client = new line.Client(configLine);

const app = express();

const port = process.env.PORT || process.env.port || 3000;

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});