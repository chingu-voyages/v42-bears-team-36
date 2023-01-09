import Cookies from 'js-cookie';
import prisma from '../../prisma/prismaClient';
import passwordEncrypter from '../../utils/passwordEncrypter';
import tokenGenerator from '../../utils/tokenGenerator';

export default async function handler(req, res) {
  // Only handle POST requests
  if (req.method === 'POST') {
    // validation Wall
    if(Object.keys(req.body).length === 0) return res.status(400).json({ message: 'No data provided' });
    if(!req.body.name) return res.status(400).json({ message: 'Name is required' });
    if(!req.body.email) return res.status(400).json({ message: 'Email is required' });
    if(!req.body.password) return res.status(400).json({ message: 'Password is required' });

    // Get name, email and password from request body
    const { name, email, password } = req.body;

    // Check if a user with the provided email already exists
    const userExists = await prisma.user.findFirst({ where: { email } });

    // If a user with the provided email already exists send a 409 Conflict response
    if (userExists) return res.status(409).json({ message: 'A user with this email already exists' })

    // Hash the password
    const hashedPassword = await passwordEncrypter(password);

    // Create a new user with the provided name, email and hashed password
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Generate a token with the user data
    const token = tokenGenerator({ id: user.id, name: user.name, email: user.email });

    // Set the "token" cookie with the generated token
    Cookies.set('token', token, { expires: 1 });

    // Send a success response with the user data
    res.status(201).json(user);
  } else {
    return res.status(405).json({ message: 'Method not allowed, please use POST method' });
  }
}
