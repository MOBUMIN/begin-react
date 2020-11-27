import React, { useRef, useState, useMemo } from 'react';
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
      id:1,username:'velopert',email:'p@gmail.com',active:true
    },
    {
      id:2,username:'tester',email:'t@example.com',active:false
    },
    {
      id:3,username:'subin',email:'kiju23@naver.com',active:false
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
  };
  
  const onRemove = id => {
    // 일치하는 user.id를 제외하고 새로운 배열을 만듦
    setUsers(users.filter(user=>user.id!==id));
  };

  const onToggle = id =>{
    setUsers(
      users.map(user=>
        user.id === id ? {...user,active: !user.active}:user
        )
    );
  };
  const count = useMemo(()=>countActiveUsers(users),[users]);
  return(
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>active 사용자 수 : {count}</div>
    </>
  )
}

function countActiveUsers(users){
  console.log('active 사용자 수 세는 중...');
  return users.filter(user=>user.active).length;
}

export default App;