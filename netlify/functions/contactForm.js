export default async function handler(req, res) {
  const { name, email, message } = req.body;

  // Here you can handle the form submission,
  // e.g., send the data to a third-party service or store it in a database.

  return res.status(200).json({ message: 'Form submitted successfully' });
}
