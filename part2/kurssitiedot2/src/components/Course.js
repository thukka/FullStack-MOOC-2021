import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>
        {course}
      </h2>
    )
  }
  
  const Part = ({ part, exercises }) => {
    return (
      <p>{part} {exercises}</p>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <>
        {course.parts.map(node =>
          <Part key={node.id} part={node.name} exercises={node.exercises} />
        )}
      </>
    )
  }
  
  const Total = ({ parts }) => {
    return (
      <>
        <p><b>Number of exercises {parts.reduce((sum, item) => sum + item.exercises, 0)} </b></p>
      </>
    )
  }
  
  const Course = ({ course }) => {
    console.log(course)
    console.log("test", course)
  
    return (
      <><h1>Web development curriculum</h1>
        {course.map((course) => {
          return (
            <div key={course.id}>
            <Header course={course.name} />
            <Content course={course} />
            <Total parts={course.parts} />
            </div>
          )
        })}
     </>
    )
  }

export default Course