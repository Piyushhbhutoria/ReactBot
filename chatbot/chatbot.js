'use strict'

const dialogflow = require('dialogflow');
const config = require('../config/keys');

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const credentials = {
    client_email: config.google_client_email,
    private_key: config.google_private_key,
};

const sessionClient = new dialogflow.SessionsClient({projectID,credentials});

module.exports = {
    textQuery : async function(text, userID, parameters = {}) {
        let sessionPath = sessionClient.sessionPath(config.googleProjectID, sessionID + userID);
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowLanguageCode,
                },
            },
            queryParams: {
                payloads: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },
    EventQuery : async function(event, userID, parameters = {}) {
        let sessionPath = sessionClient.sessionPath(config.googleProjectID, sessionID + userID);
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: event,
                    parameters: parameters,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowLanguageCode,
                },
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },

    handleAction: function (responses) {
        return responses;
    }
}