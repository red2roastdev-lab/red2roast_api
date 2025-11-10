import Partner from "../../models/partners_portal/partner.js";
import User from "../../models/partners_portal/users.js";
import bcrypt from 'bcrypt';

export const getPartnerByEmail = async (req, res) => {
  console.log("Get Partner has been hit")
    try {
    const { email } = req.params;

    // Validate input
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    // Find partner by email (case-insensitive)
    const partner = await Partner.findOne({
      where: { email },
    });

    if (!partner) {
      return res.status(404).json({ message: 'Partner not found.' });
    }

    // Send partner details (you may exclude sensitive data)
    return res.status(200).json(partner);
  } catch (error) {
    console.error('Error fetching partner by email:', error);
    return res.status(500).json({ message: 'Server error fetching partner.' });
  }
}