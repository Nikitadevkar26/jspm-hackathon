const db = require('../config/db');

class TeamModel {
  async registerFullTeam(teamData, membersData) {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // 🔹 Identify leader
      const leader = membersData.find(m => m.role === 'Leader');
      if (!leader) {
        throw new Error('Leader not found in members data');
      }

      /* ===============================
         INSERT INTO teams
      =============================== */
      const [teamResult] = await connection.execute(
        `
        INSERT INTO teams
        (
          team_name,
          college_type,
          country,
          pincode,
          leader_name,
          email,
          project_title,
          theme,
          status,
          payment_proof_image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', ?)
        `,
        [
          teamData.teamName || null,
          teamData.collegeType || null,
          teamData.country || null,
          teamData.pincode || null,
          leader.name || null,
          leader.email || null,
          teamData.projectDescription || null,
          teamData.theme || null,
          teamData.paymentProofFile || null
        ]
      );

      const teamId = teamResult.insertId;

      /* ===============================
         INSERT INTO team_members
      =============================== */
      const memberValues = membersData.map(member => [
        teamId,
        member.name || null,
        member.email || null,
        member.phone || null,
        member.gender || null,
        member.branch || null,
        member.stream || null,
        member.year || null,
        member.collegeName || null,
        member.state || null,
        member.city || null,
        member.idProofFile || null,
        member.role || null
      ]);

      const insertMembersSQL = `
        INSERT INTO team_members
        (
          team_id,
          member_name,
          email,
          phone,
          gender,
          branch,
          stream,
          year,
          college_name,
          state,
          city,
          id_proof_image,
          role
        )
        VALUES ?
      `;

      await connection.query(insertMembersSQL, [memberValues]);

      await connection.commit();
      return teamId;

    } catch (error) {
      await connection.rollback();
      console.error('Team registration failed:', error);

      // ✅ Custom error for duplicate entry
      if (error.code === 'ER_DUP_ENTRY') {
        const message = error.message.includes('email')
          ? 'A team member with this email already exists.'
          : 'A team with this name already exists.';
        // Use a custom error object or just a new Error
        const customError = new Error(message);
        customError.code = 'DUPLICATE_ENTRY'; // Add a custom code
        throw customError;
      }
      
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = new TeamModel();

