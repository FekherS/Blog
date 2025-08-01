// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const existingUser = await User.findOne({ 
            $or: [{ email }, { name: userName }] 
        });
        if (existingUser) return res.status(400).json({ error: 'User exists' });
        const user = await User.create({name: userName, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, userName : user.name, email } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: 'Invalid credentials' });
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, userName: user.name, email } });
    } catch (err) {
        console.log(err);
		res.status(500).json({ error: 'Server error' });
	}
});
  
export default router;