const {registerUser, getUser, getUsers, deleteUser, login, userProfile} = require('./user')
const {createPost} = require('./post')

module.exports = {
  registerUser,
  getUser,
  getUsers,
  deleteUser,
  login,
  userProfile,
  createPost
}
