const listHelper = require('../utils/list_helper');
const blogs = require('./blogdata.json');

describe('favorite blog', () => {

    test('blog with most likes', () => {
        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual(blogs[2]);
    });

    test('most likes should be 12', () => {
        const result = listHelper.favoriteBlog(blogs);
        expect(result.likes).toBe(12);
    });
});