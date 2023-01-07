import prisma from "../../prisma/prismaClient";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user && user.password === password) {
      res.status(200).json(user);
    }
    res.status(401).json({ message: 'Invalid email or password' });

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
