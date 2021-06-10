const dummy = (blogs) => {
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

    console.log('OBJEKTI ON: ', favoriteBlogObject);
    return favoriteBlogObject;
};

module.exports = { dummy, totalLikes, favoriteBlog };