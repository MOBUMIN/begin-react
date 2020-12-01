import React, { useMemo, useReducer } from 'react';
//import ReactDOM from 'react-dom';
import Hello from './Hello';
import './App.css';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import produce from 'immer';

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
      return produce(state, draft=>{
        draft.users.push(action.user);
      });
    case 'TOGGLE_USER':
      return produce(state, draft=>{
        const user = draft.users.find(user=>user.id===action.id);
        user.active = !user.active;
      });
    case 'REMOVE_USER':
      return produce(state, draft=>{
        const index = draft.users.find(user=>user.id===action.id);
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}

function AppUser(){
  const [state, dispatch] = useReducer(reducer, initialState);

  const {users}=state;

  const count = useMemo(()=>countActiveUsers(users),[users]);

  return(
    <UserDispatch.Provider value = {dispatch}>
      <CreateUser />
      <UserList users={users}/>
      <div>active user : {count}</div>
    </UserDispatch.Provider>
  )
}

function countActiveUsers(users){
  console.log('active 사용자 수 세는 중...');
  return users.filter(user=>user.active).length;
}

export const UserDispatch = React.createContext(null);


export default App;