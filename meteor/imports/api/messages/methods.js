import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import Messages from './messages';
import Axios from 'axios';

function getUser(userId) {
    return Axios.get(`https://randomuser.me/api?seed=${encodeURIComponent(userId)}&nat=us,dk,de,au,gb,es`)
        .then(({ data }) => data.results[0])
        .then(({ name, picture }) => {
            return {
                name: `${name.first} ${name.last}`,
                picture,
            }
        });
}

Meteor.startup(() => {
    Messages.remove({});

    Meteor.methods({

        /**
         * Posts the given message to the messages collection.
         *
         * @param content
         * @param userId
         */
        'messages.post'({ content, userId }) {
            new SimpleSchema({
                content: {
                    type: String,
                    max: 512,
                },
                userId: {
                    type: String,
                    max: 255,
                }
            }).validate({content, userId});

            const user = Promise.await(getUser(userId));

            Messages.insert({ content, user, createdAt: new Date() })
        }

    });
});