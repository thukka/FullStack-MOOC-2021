import React from 'react';

interface CourseParts {
  name: string,
  exerciseCount: number
}

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>
};

const Content = ({ parts }: { parts: Array<CourseParts> }) => {
  return (
    <>
      {parts.map(p => {
        return <p key={p.name}> {p.name} {p.exerciseCount}</p>
      })}
    </>
  );
};

const Total = ({ parts }: { parts: Array<CourseParts> }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

const App = () => {
  const courseName = 'Half Stack application Development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;