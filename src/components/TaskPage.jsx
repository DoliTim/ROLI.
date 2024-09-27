// src/components/TaskPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';

const Container = styled.div`
  padding: 40px 20px;
`;

const Title = styled.h2`
  color: #ff6600;
  margin-bottom: 20px;
`;

const TaskList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TaskCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 280px;
  margin: 10px;
  padding: 20px;
  text-align: center;

  h3 {
    margin-bottom: 15px;
  }

  button {
    background-color: #ff6600;
    color: #fff;
    padding: 12px 16px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: #e65c00;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const ProgressBar = styled.div`
  background-color: #f3f3f3;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 10px;

  div {
    height: 10px;
    background-color: #ff6600;
    width: ${(props) => props.progress}%;
    transition: width 0.1s;
  }
`;

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from API or use mock data
    setTasks([
      { id: 1, name: 'Task 1', completed: false, progress: 0 },
      { id: 2, name: 'Task 2', completed: false, progress: 0 },
      { id: 3, name: 'Task 3', completed: false, progress: 0 },
    ]);
  }, []);

  const handleStartTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, progress: 0 } : task
      )
    );

    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId) {
            const newProgress = task.progress + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...task, progress: 100, completed: true };
            }
            return { ...task, progress: newProgress };
          }
          return task;
        })
      );
    }, 500);
  };

  return (
    <Container>
      <Title>Available Tasks</Title>
      <TaskList>
        {tasks.map((task) => (
          <TaskCard key={task.id}>
            <h3>{task.name}</h3>
            {task.completed ? (
              <p>
                <FaCheckCircle color="green" /> Completed
              </p>
            ) : (
              <>
                <button onClick={() => handleStartTask(task.id)}>
                  {task.progress > 0 ? 'In Progress...' : 'Start Task'}
                </button>
                {task.progress > 0 && (
                  <ProgressBar progress={task.progress}>
                    <div />
                  </ProgressBar>
                )}
              </>
            )}
          </TaskCard>
        ))}
      </TaskList>
    </Container>
  );
};

export default TaskPage;

