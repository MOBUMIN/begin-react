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
import styled, { css, ThemeProvider } from 'styled-components';
import SButton from './components/SButton';
import Dialog from './components/Dialog';

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
  const [dialog, setDialog] = useState(false);
  const onClick = () =>{ setDialog(true); };
  const onConfirm = () =>{ setDialog(false); };
  const onCancel = () =>{ setDialog(false); };
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
      <Wrapper>
        <Circle color="blue" huge />
      </Wrapper>
      <Wrapper>
        <ThemeProvider theme={{
          palette:{
            blue:'#228be6',
            gray:'#495057',
            pink:'#f06595'
          }
        }}
        >
          <ButtonGroup>
            <SButton size="large">Button</SButton>
            <SButton>Button</SButton>
            <SButton size="small">Button</SButton>
          </ButtonGroup>
          <ButtonGroup>
            <SButton color="gray" size="large">Button</SButton>
            <SButton color="gray">Button</SButton>
            <SButton color="gray" size="small">Button</SButton>
          </ButtonGroup>
          <ButtonGroup>
            <SButton color="pink" size="large">Button</SButton>
            <SButton color="pink">Button</SButton>
            <SButton color="pink" size="small">Button</SButton>
          </ButtonGroup>
          <ButtonGroup>
            <SButton size="large" outline>Button</SButton>
            <SButton color="gray" outline>Button</SButton>
            <SButton color="pink" size="small" outline onClick={onClick}>Dialog</SButton>
          </ButtonGroup>
          <ButtonGroup>
            <SButton size="large" fullWidth>Button</SButton>
            <SButton color="gray" fullWidth>Button</SButton>
            <SButton color="pink" size="small" fullWidth>Button</SButton>
          </ButtonGroup>
          <Dialog
          title = "정말 삭제?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={onConfirm}
          onCancel={onCancel}
          visible={dialog}
          >
            정말로 데이터 삭제 ? 
          </Dialog>
        </ThemeProvider>
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

const Circle = styled.div`
  width:5rem;
  height:5rem;
  background:${props=>props.color || 'black'};
  border-radius:50%;
  ${props=>
  props.huge && css`
    width:10rem;
    height:10rem;
  `}
`;

const ButtonGroup = styled.div`
& + &{
  margin-top: 1rem;
}
`;

export default App;