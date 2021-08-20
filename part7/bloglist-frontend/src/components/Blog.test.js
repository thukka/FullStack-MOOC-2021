import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
    let component;

    const newBlog = {
        'title': 'Testblog with Jest',
        'author': 'Test Toni',
        'url': 'www.foo.bar',
        'likes': 50,
        'user': {
            'username': 'test'
        }
    };

    // mock params for PropTypes
    const mockBlogs = [];
    const mockSetBlogs = jest.fn();
    const mockUser = {};
    const mockHandle = jest.fn();

    beforeEach(() => {
        component = render(
            <Blog blog={newBlog} blogs={mockBlogs} setBlogs={mockSetBlogs} user={mockUser} blogLikeHandle={mockHandle} />
        );
    });

    test('blog title and author are rendered', () => {

        expect(component.container).toHaveTextContent(
            'Testblog with Jest'
        );
        expect(component.container).not.toHaveTextContent(
            'www.foo.bar'
        );
        expect(component.container).not.toHaveTextContent(
            'likes 50'
        );
    });

    test('URL and likes are shown when viewing additional info', () => {
        const button = component.getByText('view');
        fireEvent.click(button);

        expect(component.container).toHaveTextContent(
            'www.foo.bar'
        );
        expect(component.container).toHaveTextContent(
            'likes 50'
        );
    });

    test('like function was pressed twice', () => {
        const button = component.getByText('view');
        fireEvent.click(button);

        const likeButton = component.getByText('like');
        fireEvent.click(likeButton);
        fireEvent.click(likeButton);

        expect(mockHandle.mock.calls).toHaveLength(2);
    });
});
