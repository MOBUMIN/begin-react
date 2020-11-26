import React from 'react';
import Hello from './Hello';
import './App.css';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';

function App() {
  const name = 'helloworld';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize:24,
    padding: '1rem'
  }
  return (
    <>
      <Wrapper>
        <Hello name="이것은프롭스" color="red" isSpecial />
        <Hello />
        <div style = {style}>{name}</div>
        <div className="gray-box"></div>
      </Wrapper>

      <Wrapper>
        <Counter />
      </Wrapper>
      
      <Wrapper>
        <InputSample />
      </Wrapper>

      <Wrapper>
        <UserList />
      </Wrapper>
    </>
  );
}

export default App;