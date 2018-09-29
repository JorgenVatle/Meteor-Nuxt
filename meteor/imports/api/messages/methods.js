import { Meteor } from 'meteor/meteor';
import Messages from './messages';

Meteor.startup(() => {
    Meteor.methods({

        /**
         * Posts the given message to the messages collection.
         *
         * @param content
         */
        'messages.post'(content) {
            check(content, String);

            Messages.insert({ content, createdAt: new Date() })
        }

    });
});