import React from 'react';
import Hello from './Hello';
import './App.css';
import Wrapper from './Wrapper.js';

{/* 주석 엄청 불편하게 다는군 */}
function App() {
  const name = 'helloworld';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize:24,
    padding: '1rem'
  }
  return (
    <Wrapper>
      <Hello name="이것은프롭스" color="red" isSpecial />
      <Hello />
      <div style = {style}>{name}</div>
      <div className="gray-box"></div>
    </Wrapper>
  );
}

export default App;