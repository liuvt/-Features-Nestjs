import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

/* File json with information account */
const configJsonFirebase = 'primary-key.json';

@Injectable()
export class NotificeService {

    constructor() {
        /* Config to app account */
        admin.initializeApp({
            credential: admin.credential.cert(configJsonFirebase),
        });
    }

    /* Send notifice message */
    async send(message) {
        try {
            admin.messaging().send(message);
            console.log('Message sent successfully');
            return message;
        } catch (err) {
            console.log('Failed to send the message:', err);
            return err;
        }
    }

    /* Send multi notifice message */
    async sendMulti(messages, tokens) {
        try {
            const message = Object.assign(messages, tokens);
            const rs = await admin.messaging().sendMulticast(message)
                .then((response) => {
                    const failedTokens = [];
                    const passTokens = [];
                    if (response.failureCount > 0) {
                        response.responses.forEach((res, id) => {
                            if (!res.success) {
                                failedTokens.push(tokens.tokens[id]);
                            } else {
                                passTokens.push(tokens.tokens[id]);
                            }
                        });
                        delete message.tokens;
                    }
                    return (Object.assign(messages, { tokens: passTokens }, { failedtokens: failedTokens }));
                });
            if (rs.tokens.length <= 0) {
                return "Error: can't found user device!";
            }
            return rs;
        } catch (err) {
            console.log('Failed to send the message:', err);
            return err;
        }
    }

}
