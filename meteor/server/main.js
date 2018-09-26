import { Meteor } from "meteor/meteor";
import { onPageLoad } from "meteor/server-render";

Meteor.startup(() => {
  // Code to run on server startup.
  console.log(`Greetings from ${module.id}!`);

    WebApp.rawConnectHandlers.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
        return next();
    });
});

onPageLoad(sink => {
  // Code to run on every request.
  sink.renderIntoElementById(
    "server-render-target",
    `Server time: ${new Date}`
  );
});
