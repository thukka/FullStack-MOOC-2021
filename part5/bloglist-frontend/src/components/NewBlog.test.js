import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewBlog from './NewBlog';

describe('<NewBlog />', () => {

    test('blog is submitted with correct info', () => {
        let component;
        const mockHandle = jest.fn();

        component = render(
            <NewBlog newBlogHandle={mockHandle} />
        );

        const inputTitle = component.container.querySelector('#title');
        const inputAuthor = component.container.querySelector('#author');
        const inputURL = component.container.querySelector('#URL');
        const form = component.container.querySelector('form');

        fireEvent.change(inputTitle, {
            target: { value: 'Blog made with fireEvent change' }
        });
        fireEvent.change(inputAuthor, {
            target: { value: 'JestTest' }
        });
        fireEvent.change(inputURL, {
            target: { value: 'www.testzone.fi' }
        });
        fireEvent.submit(form);

        expect(mockHandle.mock.calls).toHaveLength(1);
        expect(mockHandle.mock.calls[0][0].title).toBe('Blog made with fireEvent change');
        expect(mockHandle.mock.calls[0][0].author).toBe('JestTest');
        expect(mockHandle.mock.calls[0][0].url).toBe('www.testzone.fi');
    });
});