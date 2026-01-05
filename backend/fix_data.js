const db = require('./config/db');

async function fixData() {
    try {
        console.log("Updating 'approved' to 'Approved'...");
        const [res1] = await db.query("UPDATE teams SET status = 'Approved' WHERE status = 'approved'");
        console.log(`Updated ${res1.affectedRows} teams to Approved.`);

        console.log("Updating 'rejected' to 'Rejected'...");
        const [res2] = await db.query("UPDATE teams SET status = 'Rejected' WHERE status = 'rejected'");
        console.log(`Updated ${res2.affectedRows} teams to Rejected.`);

    } catch (err) {
        console.error("ERROR:", err);
    } finally {
        await db.end();
    }
}

fixData();
