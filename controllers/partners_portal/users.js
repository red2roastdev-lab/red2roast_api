import Partner from "../../models/partners_portal/partner.js";
import User from "../../models/partners_portal/users.js";
import bcrypt from 'bcrypt';
import { onboardingEmail } from "../../services/onboardingEmail.js";
import { generateActivationToken, verifyActivationToken } from "../../utils/tokenUtils.js";

const saltRounds = 10;


export const requestAccess = async (req, res) => {
    console.log("requestAcess has been hit");
    try {
        const { email } = req.body;
        const saltRounds = 10;


        if (!email) return res.status(400).json({ message: 'Email is required' });

        //Generate a temporary password
        const tempPass = Math.random().toString(36).slice(-8);
        const hashedTempPass = await bcrypt.hash(tempPass, saltRounds);

        // save user in the DB
        let user = await User.findOne({ where: { email } })

        if (!user) {
            user = await User.create({
                email,
                password: hashedTempPass,
                status: 'pending',
                role: 'partner'


            });
        } else {
            //if the user exists but not active, reset their temp password
            if (user.status !== 'active') {
                await user.update({ password: hashedTempPass });
            } else {
                return res.status(400).json({ message: 'User already has active access' });
            }
        }

        onboardingEmail(email, tempPass);

        return res.status(200).json({ message: 'Temporary credentails sent to email' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server not reachable' });
    }
}

export const completeRegistration = async (req, res) => {
    console.log("completeRegistration has been hit");
    try {
        const { token, password, confirmPassword, businessName, contactPerson } = req.body;

        // Validate input
        if (!token || !password || !confirmPassword || !businessName || !contactPerson) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        // Verify token
        const decoded = verifyActivationToken(token)
        const { email } = decoded
        // try {
        //     decoded = verifyActivationToken(token)
        // } catch (err) {
        //     return res.status(400).json({ message: "Invalid or expired registration token." });
        // }

        // Find the user using the email from the token
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //  Update User table
        await user.update({
            password: hashedPassword,
            username: contactPerson,
            status: 'active'
        });

        // Create or update Partner record
        let partner = await Partner.findOne({ where: { email } });
        if (!partner) {
            partner = await Partner.create({
                email: email,
                business_name: businessName,
                password: hashedPassword,
                contact_person: contactPerson,
                is_active: true
            });
        } else {
            await partner.update({
                business_name: businessName,
                password: hashedPassword,
                contact_person: contactPerson,
                is_active: true
            });
        }
        return res.status(200).json({ message: "Registration completed successfully!" });
    } catch (err) {
        console.error("completeRegistration error:", err);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
};


export const handleLogin = async (req, res) => {
    console.log("Login Endpoint has been hit");

    try {
        const { email, password } = req.body;

        //check if user exits
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        //Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // If the user is a partner, fetch their business details
        let businessDetails = null;
        if (user.role === 'partner') {
            // Assuming there is a Partner model that contains business details
            businessDetails = await Partner.findOne({ where: { email: user.email } }); // Adjust based on your schema
        }

        const authToken = generateActivationToken({
            id: user.id, email: user.email, role: user.role
        });

        const userData = {
            id: user.id,
            email: user.email,
            name: user.username,
            role: user.role,
            businessDetails: businessDetails ? businessDetails : null,
        };
        res.status(200).json({ message: 'Login successful', user: userData, authToken });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

export const createAdmin = async (req, res) => {
    console.log("requestAcess has been hit");
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // save user in the DB
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists." });
        }

        //Generate hashed password
        const hashedPass = await bcrypt.hash(password, saltRounds);

        // Create the admin
        const newUser = await User.create({
            username,
            email,
            password: hashedPass,
            status: "active",
            role: "admin",
        });

        // Never return the password
        const safeUser = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            status: newUser.status,
            role: newUser.role,
        };
        return res.status(200).json({ message: 'Admin Account Created' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server not reachable' });
    }
}

