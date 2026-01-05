const Registration = require('./models/admin/registrationModel');
const db = require('./config/db');

async function test() {
    try {
        console.log("Testing getAllTeams...");
        const teams = await Registration.getAllTeams();
        console.log("Success! Found:", teams.length, "teams");
        console.log(teams);
    } catch (err) {
        console.error("ERROR CAUGHT:", err);
    } finally {
        // Close pool to let script exit
        await db.end();
    }
}

test();
