const {registerUser, getUser, getUsers, deleteUser, login, userProfile} = require('./user')
const {createPost, getPosts, getPost} = require('./post')

module.exports = {
  registerUser,
  getUser,
  getUsers,
  deleteUser,
  login,
  userProfile,
  createPost,
  getPosts,
  getPost
}
