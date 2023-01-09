import prisma from '../../prisma/prismaClient';
import isEncryptedPasswordValid from '../../utils/isEncryptedPasswordValid';
import tokenGenerator from '../../utils/tokenGenerator';
import Cookies from 'js-cookie';

export default async function handler(req, res) {
  // Only handle POST requests
  if (req.method === 'POST') {
    // validation Wall
    if(Object.keys(req.body).length === 0) return res.status(400).json({ message: 'No data provided' });
    else if(!req.body.email) return res.status(400).json({ message: 'Email is required' });
    else if(!req.body.password) return res.status(400).json({ message: 'Password is required' });

    // Get email and password from request body
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // If the user is not found, send a 404 Not Found response
    if(!user) return res.status(404).json({ message: 'User not found' });

    // If the user is found and the password matches
    if(user && user.password) {
      const isPasswordValid = await isEncryptedPasswordValid(password, user.password);
      if(isPasswordValid) { 
        // Generate a token with the user data
        const token = tokenGenerator(user);
        // Set the "token" cookie with the generated token
        Cookies.set('token', token, { expires: 1 });
        // Send a success response with the user data
        return res.status(200).json({ token });
      } else {
        // If the password is not valid, send a 401 Unauthorized response
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
