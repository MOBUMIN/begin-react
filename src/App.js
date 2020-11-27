import React, { useRef, useState } from 'react';
import Hello from './Hello';
import './App.css';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const name = 'helloworld';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize:24,
    padding: '1rem'
  };
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
        <AppUser />
      </Wrapper>
    </>
  );
}

function AppUser(){
  const [inputs, setInputs] = useState({
    username: '', email: ''
  });
  const {username, email} = inputs;
  const onChange=(e)=>{
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]:value
    });
  };
  const [users, setUsers]= useState([
    {
      id:1,username:'velopert',email:'p@gmail.com'
    },
    {
      id:2,username:'tester',email:'t@example.com'
    },
    {
      id:3,username:'subin',email:'kiju23@naver.com'
    }
  ]);
  const nextId = useRef(4);
  const onCreate = () => {
    const user={
      id: nextId.current,username,email
    };
    setUsers([...users, user]);
    // setUsers(users.concat(user));
    setInputs({
      username: '', email: ''
    });
    nextId.current+=1;
  }
  return(
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
    </>
  )
}

export default App;