import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseWithDescription {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionpart extends CourseWithDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseExtendedInfo extends CourseWithDescription {
  type: 'special';
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionpart | CourseExtendedInfo;

const assertNever = (value: never): never => {
  throw new Error(`
  Unhandled discriminated union member: ${JSON.stringify(value)}
  `)
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return <p><strong>Name: {part.name}</strong> <br /> Exercise count: {part.exerciseCount} <br /> Description: {part.description} <br /> Type: {part.type}</p>
    case 'groupProject':
      return <p><strong>Name: {part.name}</strong> <br /> Exercise count: {part.exerciseCount} <br /> Group Project Count: {part.groupProjectCount} <br /> Type: {part.type}</p>
    case 'submission':
      return <p><strong>Name: {part.name}</strong> <br /> Exercise count: {part.exerciseCount} <br /> Description: {part.description} <br /> Exercise Submission Link: {part.exerciseSubmissionLink} <br /> Type: {part.type}</p>
    case 'special':
      return <p><strong>Name: {part.name}</strong> <br /> Exercise count: {part.exerciseCount} <br /> Description: {part.description} <br /> Requirements: {part.requirements.join(', ')} <br /> Type: {part.type}</p>
    default:
      return assertNever(part);
  }
};

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>
};

const Content = ({ parts }: { parts: Array<CoursePart> }) => {
  return (
    <div>
      {parts.map(p => {
        return <Part part={p} key={p.name} />
      })}
    </div>
  );
};

const Total = ({ parts }: { parts: Array<CoursePart> }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

const App = () => {
  const courseName = 'Half Stack application Development';
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;