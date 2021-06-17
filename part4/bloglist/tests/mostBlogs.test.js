const listHelper = require('../utils/list_helper');
const blogs = require('./blogdata.json');

describe('most blogs test', () => {

    test('most blogs per author', () => {
        const result = listHelper.mostBlogs(blogs);
        expect(result.blogs).toBe(3);
    });
});