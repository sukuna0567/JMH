const User = require('../models/User');
const emailjs = require('emailjs-com');

const registerUser = async (req, res) => {
  const { email, pseudo, password } = req.body;

  try {
    const newUser = new User({ email, pseudo, password });
    await newUser.save();

    // Send email to admin
    const adminEmailData = {
      service_id: 'service_injk9vn',
      template_id: 'template_00srnkm',
      user_id: 'xacorlyEj5cfAZ1ZU',
      template_params: {
        email: newUser.email,
        pseudo: newUser.pseudo,
        message: `A new user has just signed up: ${newUser.pseudo}.`
      }
    };

    emailjs.send(adminEmailData)
      .then(() => console.log('Admin notified via email'))
      .catch((error) => console.log('Error sending email: ', error));

    // Send email to user
    const userEmailData = {
      service_id: 'service_injk9vn',
      template_id: 'template_00srnkm',
      user_id: 'xacorlyEj5cfAZ1ZU',
      template_params: {
        email: newUser.email,
        pseudo: newUser.pseudo,
        message: `Welcome to JMH! Here's your personal link: https://jmh.com/u/${newUser.pseudo}`
      }
    };

    emailjs.send(userEmailData)
      .then(() => console.log('User notified via email'))
      .catch((error) => console.log('Error sending email: ', error));

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

module.exports = { registerUser };
