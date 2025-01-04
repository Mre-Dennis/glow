import dotenv from 'dotenv';
import express from 'express'; // Import Express framework
import session from 'express-session'; // For handling user sessions
import { PrismaClient } from '@prisma/client'; // Import Prisma client to interact with the database
import bcrypt from 'bcrypt'; // Import bcrypt for hashing passwords
import cors from 'cors'; // Import CORS to handle cross-origin requests
import formsRoutes from './routes/forms.js'; // Import the routes for form handling (from the routes/forms.js file)

dotenv.config(); // Load environment variables from a .env file
console.log('DATABASE_URL:', process.env.DATABASE_URL); // Log the database URL to verify it's loaded correctly

const prisma = new PrismaClient(); // Instantiate Prisma client to interact with the database
const app = express(); // Create a new Express app
const PORT = process.env.PORT || 5000; // Use the PORT from environment variables or default to 5000

// Load allowed origins from environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []; // Split the comma-separated list of allowed origins

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Allow preflight (OPTIONS) requests for CORS
app.options('*', cors());

app.use('/api', formsRoutes); // Use the routes

// CORS configuration to handle cross-origin requests securely
app.use(cors({
  origin: (origin, callback) => {
    // If origin is not set or allowedOrigins is empty, allow all origins
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Accept the request
    } else {
      callback(new Error('CORS policy does not allow this origin'), false); // Reject the request if the origin is not allowed
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers for requests
  credentials: true, // Allow credentials like cookies and authorization headers
}));


// Session Middleware to handle user sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'mySuperSecretKey123!', // Secret key to sign the session ID cookie
    resave: false, // Prevent session from being saved even if it's not modified
    saveUninitialized: false, // Do not save empty sessions
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      httpOnly: true, // Ensure cookies can't be accessed via JavaScript
      maxAge: 1000 * 60 * 60 * 24, // Set cookie expiration to 1 day
    },
  })
);

app.get('/status', (req, res) => {
  res.send('App is up and running');
});

// User Registration Route
app.post('/auth/register', async (req, res) => {
  // Destructure the request body to get user details
  const { name, email, password } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' }); // Send 400 Bad Request if any field is missing
  }

  try {
    // Check if a user with the given email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' }); // Send 409 Conflict if user exists
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Store the hashed password
        isVerified: false, // Default to unverified until the user confirms their email
        role: 'USER', // Default user role
      },
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser }); // Respond with 201 Created if successful
  } catch (error) {
    console.error('Registration error:', error); // Log any errors that occur
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with 500 Internal Server Error if something goes wrong
  }
});

// User Login Route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' }); // Send 400 Bad Request if any field is missing
  }

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // If the user doesn't exist or the password doesn't match, send a 401 Unauthorized error
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Store user ID in the session after successful login
    req.session.userId = user.id; 
    res.status(200).json({ message: 'Login successful', user }); // Respond with 200 OK if login is successful
  } catch (error) {
    console.error('Login error:', error); // Log any errors that occur
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with 500 Internal Server Error if something goes wrong
  }
});

// User Logout Route
app.post('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' }); // Send 500 Internal Server Error if logout fails
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).json({ message: 'Logout successful' }); // Respond with 200 OK if logout is successful
  });
});

// Start the Server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // Log that the server is running successfully
});
