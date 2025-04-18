const cron = require('node-cron');
const Election = require('../models/election');

cron.schedule('*/1 * * * *', async () => {
  try {
    const elections = await Election.find({});
    const now = new Date();
    // console.log("Current Time:", now.toISOString());

    for (const election of elections) {
      const start = new Date(election.startDate);
      const end = new Date(election.endDate);

    //   console.log(`\nChecking Election: ${election.electionId}`);
    //   console.log("Start:", start.toISOString());
    //   console.log("End:", end.toISOString());
    //     console.log("Current Status:", election.status);
    //     console.log("Current Time:", now.toISOString());

      let newStatus = election.status;

      if (now >= end) {
        newStatus = 'completed';
      } else if (now >= start && now < end) {
        newStatus = 'ongoing';
      } else if (now < start) {
        newStatus = 'upcoming';
      }

      if (election.status !== newStatus) {
        election.status = newStatus;
        await election.save();
        // console.log(`Updated status to: ${newStatus}`);
      } else {
        // console.log(`No update needed. Still: ${newStatus}`);
      }
    }
  } catch (err) {
    console.error("Cron job error:", err.message);
  }
});
