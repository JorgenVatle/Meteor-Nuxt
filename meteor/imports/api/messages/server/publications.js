import { Meteor } from 'meteor/meteor';
import Messages from '../messages';

Meteor.startup(() => {

    Meteor.publish('messages', () => {
        return Messages.find({}, {
            sort: {
                createdAt: 1,
            },
            limit: 50,
        })
    });

});