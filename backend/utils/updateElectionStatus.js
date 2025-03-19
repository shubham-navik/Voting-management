const cron = require('node-cron');
const Election = require('../models/election');

cron.schedule('*/1 * * * *', async () => {

    try {
        const elections = await Election.find({});
        elections.forEach(async (election) => {
            const currentDate = new Date();
            if (currentDate > election.endDate) {
                election.status = 'completed';
                await election.save();
            }
            if (currentDate > election.startDate && currentDate < election.endDate) {
                election.status = 'ongoing';
                await election.save();
            }
            if (currentDate < election.startDate) {
                election.status = 'pending';
                await election.save();
            }
        })
    }
    catch (err) {
        console.log(err.message);
    }
});
