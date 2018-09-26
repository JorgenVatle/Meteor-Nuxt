import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    Meteor.methods({
        'connection.info'() {
            return this.connection;
        }
    });

});
