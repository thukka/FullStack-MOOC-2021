const listHelper = require('../utils/list_helper');

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ];

    const listWithThreeBlogs = [
        { title: 'Hello World', likes: 10 },
        { title: 'JS for dummies', likes: 100 },
        { title: 'Advanced Python', likes: 20 }
    ];

    const blogWithZeroLikes = [
        { title: 'F-Zero', likes: 0 },
    ];

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    test('total likes when there are multiple blog entries', () => {
        const result = listHelper.totalLikes(listWithThreeBlogs);
        expect(result).toBe(130);
    });

    test('blog with zero likes', () => {
        expect(listHelper.totalLikes(blogWithZeroLikes)).toBe(0);
    });

});