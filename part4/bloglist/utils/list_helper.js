const dummy = () => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
    let startLikes = 0;
    let favoriteBlogObject;

    blogs.filter(element => {
        if (element.likes > startLikes) {
            startLikes = element.likes;
            favoriteBlogObject = element;
        }
    });

    return favoriteBlogObject;
};

const mostBlogs = (blogs) => {
    // find author with most blogs
    const copyBlog = [...blogs];
    const result = copyBlog.sort((a, b) =>
        copyBlog.filter(v => v === a).length
        - copyBlog.filter(v => v === b).length).pop();

    // total amount of blogs written by author
    const totalBlogs = blogs.reduce((sum, item) => {
        if (item.author === result.author) {
            sum++;
        }
        return sum;
    }, 0);

    const resultAuthor = {
        'author': result.author,
        'blogs': totalBlogs
    };
    //console.log('result: ', resultAuthor);
    return resultAuthor;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };