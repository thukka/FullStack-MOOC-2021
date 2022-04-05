CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT null, title text NOT null, likes int DEFAULT 0 NOT null);
INSERT INTO blogs (author, url, title) values ('Toni', 'www.google.fi', 'POSTGRESQL 101');
INSERT INTO blogs (author, url, title) values ('Gandalf', 'www.wizarsnstuff.com', 'Magic!');
