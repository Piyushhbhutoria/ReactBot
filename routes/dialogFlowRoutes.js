'use strict'

const chatbot = require('../chatbot/chatbot');

module.exports = app => {
    app.get('/', (req, res) => {
        res.send({'hello':'there'});
    });

    app.post('/api/df_text_query', async (req, res) => {
        let responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters).catch((msg) => {
            console.log('error -> '+msg);
        });
        // console.log(responses);
        res.send(responses[0].queryResult);
    });

    app.post('/api/df_event_query', async (req, res) => {
        let responses = await chatbot.EventQuery(req.body.event, req.body.userID, req.body.parameters).catch((msg) => {
            console.log('error -> '+msg);
        });
        // console.log(responses);
        res.send(responses[0].queryResult);
    });
}