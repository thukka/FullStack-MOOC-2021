const Blog = require('../models/blogreview');
const User = require('../models/user');

const initialBlogs = [
    { 'author': 'Teppo Testaaja', 'likes': 321, 'title': 'Testaajan ruokanurkka', 'url': 'http://www.testzone.fi' },
    { 'author': 'Teppo Testaaja', 'likes': 555, 'title': 'Sipulikeitto', 'url': 'http://www.sipulikeitto.fi' },
    { 'author': 'Kalle Kalamies', 'likes': 5, 'title': '3rd edition of how to cook with fire', 'url': 'http://www.kokkikirja.fi' }
];

const testUser = {
    'username': 'testhelper_user',
    'password': process.env.TESTPW,
};

const blogsInDb = async () => {
    const allBlogs = await Blog.find({});
    return allBlogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const allUsers = await User.find({});
    return allUsers.map(u => u.toJSON());
};

module.exports = { initialBlogs, blogsInDb, usersInDb, testUser };