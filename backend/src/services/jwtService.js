const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

function generateToken(user) {
    return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = { generateToken, verifyToken };
