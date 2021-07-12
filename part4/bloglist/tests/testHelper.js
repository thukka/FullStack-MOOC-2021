const Blog = require('../models/blogreview');

const initialBlogs = [
    { 'author': 'Teppo Testaaja', 'likes': 321, 'title': 'Testaajan ruokanurkka', 'url': 'http://www.testzone.fi' },
    { 'author': 'Teppo Testaaja', 'likes': 555, 'title': 'Sipulikeitto', 'url': 'http://www.sipulikeitto.fi' },
    { 'author': 'Kalle Kalamies', 'likes': 5, 'title': '3rd edition of how to cook with fire', 'url': 'http://www.kokkikirja.fi' }
];

const blogsInDb = async () => {
    const allBlogs = await Blog.find({});
    return allBlogs.map(blog => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };