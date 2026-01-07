const teamRegistrationModel = require('../../models/teams/teamRegistrationModel');

exports.submitRegistration = async (req, res) => {
  try {
    // FormData sends strings, so formData comes as string
    const { formData } = req.body;

    if (!formData) {
      return res.status(400).json({
        success: false,
        message: 'Form data is missing'
      });
    }

    // ✅ Parse formData JSON safely
    const parsedFormData =
      typeof formData === 'string' ? JSON.parse(formData) : formData;

    // ✅ Validate members
    if (
      !Array.isArray(parsedFormData.members) ||
      parsedFormData.members.length < 2
    ) {
      return res.status(400).json({
        success: false,
        message: 'At least two team members are required'
      });
    }

    /* ===============================
       FILE HANDLING (MULTER)
    =============================== */

    // ✅ Payment proof image (teams table)
    if (req.files && req.files.paymentProof && req.files.paymentProof.length > 0) {
      parsedFormData.paymentProofFile =
        req.files.paymentProof[0].filename;
    } else {
      parsedFormData.paymentProofFile = null;
    }

    // ✅ ID proof images (team_members table)
    parsedFormData.members.forEach((member, index) => {
      if (req.files && req.files.idProofs && req.files.idProofs[index]) {
        member.idProofFile = req.files.idProofs[index].filename;
      } else {
        member.idProofFile = null;
      }
    });

    // 🔍 Debug log (KEEP until everything is stable)
    console.log(
      'FINAL DATA TO DB:',
      JSON.stringify(parsedFormData, null, 2)
    );

    /* ===============================
       DATABASE INSERT
    =============================== */

    const teamId = await teamRegistrationModel.registerFullTeam(
      parsedFormData,
      parsedFormData.members
    );

    return res.status(201).json({
      success: true,
      message: 'Registration completed successfully',
      teamId
    });

  } catch (error) {
    console.error('Registration Error:', error);

    // ✅ Custom error handling for duplicate entries
    if (error.code === 'DUPLICATE_ENTRY') {
      return res.status(409).json({ // 409 Conflict
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error while registering team'
    });
  }
};
