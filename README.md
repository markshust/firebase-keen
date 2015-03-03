# firebase-keen

Code for show & tell tutorial at https://www.airpair.com/firebase/posts/making-a-keenio-dashboard-realtime-by-integrating-it-with-firebase--d3js

This script is an example of how to make a Keen.io real-time dashboard by integrating it with Firebase. 

This is the result of the finalized example script, which demonstrates average purchase cost by gender:

![Real-Time Dashboard](https://raw.githubusercontent.com/markoshust/firebase-keen/master/images/dashboard.gif)

After modifying the auth credentials for Firebase and Keen.io in the scripts, you would:

Start the event job queue worker:

    node workers/eventJobQueueWorker.js

Create some events:

    node workers/eventJobQueueGenerator.js

Streaming data from Keen.io back into Firebase:

    node workers/keenCacheWorker.js

Then once we have a couple keen cache records, we'll fire up our dashboard:

    open index.html

For more info, please read the complete tutorial at https://www.airpair.com/firebase/posts/making-a-keenio-dashboard-realtime-by-integrating-it-with-firebase--d3js


## License

WTFPL - Do what you want with it and have fun. If you want to contibute any other cool ideas for integrating Keen.io with Firebase, let me know so that I can post back to it here!

If you like this script and are feeling philanthropic, please donate funds to [My Alzheimer's Walk Page for Team Shust](http://shust.com). It's a fantastic organization and your donation will go a long way in finding a cure for a horrible disease.
