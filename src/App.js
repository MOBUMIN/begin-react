import React, { useMemo, useReducer, useState } from 'react';
//import ReactDOM from 'react-dom';
import Hello from './Hello';
import './App.scss';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import produce from 'immer';
import ErrorCheck from './ErrorCheck';
import ErrorBoundary from './ErrorBoundary';
import Button from './components/Button';
import CheckBox from './components/CheckBox';

// ReactDOM.render(<Counter />, document.getElementById('root'));
function App() {
  const name = 'helloworld';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize:24,
    padding: '1rem'
  };
  const variable = {
    check: 1, name: 'error'
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

      <Wrapper>
        <ErrorBoundary>
          <ErrorCheck variable={variable} />
        </ErrorBoundary>
      </Wrapper>

      <Wrapper>
        <div className="App">
          <div className="buttons">
            <Button size="large" onClick={()=>console.log('click!')}>BUTTON</Button>
            <Button>BUTTON</Button>
            <Button size="small">BUTTON</Button>
          </div>
          <div className="buttons">
            <Button size="large" color="orange">BUTTON</Button>
            <Button color="orange">BUTTON</Button>
            <Button size="small" color="orange">BUTTON</Button>
          </div>
          <div className="buttons">
            <Button size="large" color="green">BUTTON</Button>
            <Button color="green">BUTTON</Button>
            <Button size="small" color="green">BUTTON</Button>
          </div>
          <div className="buttons">
            <Button size="large" color="blue" outline>BUTTON</Button>
            <Button color="orange" outline>BUTTON</Button>
            <Button size="small" color="green" outline>BUTTON</Button>
          </div>
          <div className="buttons">
            <Button size="large" color="blue" fullWidth>BUTTON</Button>
            <Button color="orange" fullWidth>BUTTON</Button>
            <Button size="small" color="green" fullWidth>BUTTON</Button>
          </div>
        </div>
      </Wrapper>
      <Wrapper>
        <Checking />
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

function Checking(){
  const [check, setCheck] = useState(false);
  const onChange = e => {
    setCheck(e.target.checked);
  };
  return(
    <div>
      <CheckBox onChange={onChange} checked={check}>
        다음 약관에 모두 동의
      </CheckBox>
      <p>
        <b>check: </b>
        {check? 'true' : 'false'}
      </p>
    </div>
  )
}

export default App;