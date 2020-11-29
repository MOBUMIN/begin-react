import React, { useRef, useState, useMemo, useCallback, useReducer } from 'react';
import ReactDOM from 'react-dom';
import Hello from './Hello';
import './App.css';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';

// ReactDOM.render(<Counter />, document.getElementById('root'));
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

const initialState={
  inputs:{
    username:'',email:''
  },
  users:[
    {
      id:1,username:'velopert',email:'p@gmail.com',active:true
    },
    {
      id:2,username:'tester',email:'t@example.com',active:false
    },
    {
      id:3,username:'subin',email:'kiju23@naver.com',active:false
    }
  ]
};

function reducer(state,action){
  switch(action.type){
    case 'CREATE_USER':
      return{
        users:state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return{
        users:state.users.map(user=>
          user.id===action.id?{...user, active: !user.active}:user)
      };
    case 'REMOVE_USER':
      return{
        users:state.users.filter(user=>user.id!==action.id)
      };
    default:
      return state;
  }
}

function AppUser(){
  const [{username, email},onChange,reset] = useInputs({
    username:'',
    email:''
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const {users}=state;
  const nextID = useRef(4);

  const onCreate=useCallback(()=>{
    dispatch({
      type:'CREATE_USER',
      user:{
        id: nextID.current,
        username,email
      }
    });
    reset();
    nextID.current+=1;
  },[username,email,reset]);

  const onToggle=useCallback(id=>{
    dispatch({
      type:'TOGGLE_USER',id
    });
  }, []);

  const onRemove = useCallback(id=>{
    dispatch({
      type:'REMOVE_USER',id
    });
  },[]);

  const count = useMemo(()=>countActiveUsers(users),[users]);

  return(
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove}/>
      <div>active user : {count}</div>
    </>
  )
}

function countActiveUsers(users){
  console.log('active 사용자 수 세는 중...');
  return users.filter(user=>user.active).length;
}

export default App;