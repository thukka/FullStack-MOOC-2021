const Blog = require('../models/blogreview');

const initialBlogs = [
    { 'author': 'Teppo Testaaja', 'id': '60e967ee6daeb1134b58114c', 'likes': 321, 'title': 'Testaajan ruokanurkka', 'url': 'http://www.testzone.fi' },
    { 'author': 'Teppo Testaaja', 'id': '60e968026daeb1134b58114d', 'likes': 555, 'title': 'Sipulikeitto', 'url': 'http://www.sipulikeitto.fi' },
    { 'author': 'Kalle Kalamies', 'id': '60ec2ca2fbbe6b0d4448da41', 'likes': 5, 'title': '3rd edition of how to cook with fire', 'url': 'http://www.kokkikirja.fi' }
];

const blogsInDb = async () => {
    const allBlogs = await Blog.find({});
    return allBlogs.map(blog => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };