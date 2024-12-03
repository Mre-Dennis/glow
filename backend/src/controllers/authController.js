const bcrypt = require('bcrypt');
const prisma = require('../config/db');

// Register User
exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Email already in use' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.user = { id: user.id, email: user.email };
    res.status(200).json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout User
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
};
