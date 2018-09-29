import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import Messages from './messages';

Meteor.startup(() => {
    Meteor.methods({

        /**
         * Posts the given message to the messages collection.
         *
         * @param content
         */
        'messages.post'(content) {
            new SimpleSchema({
                content: {
                    type: String,
                    max: 255,
                }
            }).validate({content});

            Messages.insert({ content, createdAt: new Date() })
        }

    });
});