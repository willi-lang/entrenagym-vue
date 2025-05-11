module.exports = {
  secret: process.env.JWT_SECRET || 'secreto',
  expiresIn: '7d'
};