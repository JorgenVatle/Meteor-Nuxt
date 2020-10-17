import WebSocket from "isomorphic-ws";
import {ReactiveMeteor} from "~/assets/typescript/ReactiveMeteor";

const API_URL = <string>process.env.API_URL;

const Meteor = new ReactiveMeteor({
  endpoint: API_URL,
  SocketConstructor: WebSocket,
});

Meteor.on('connected', () => console.info('Successfully connected to Meteor running on %s !', API_URL));
Meteor.on('disconnected', () => console.warn('Lost connection to Meteor!'));
Meteor.on('error', (e) => console.error('Encountered an error with connection to Meteor DDP!', e));

export default Meteor;
