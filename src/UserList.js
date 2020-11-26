import React from 'react';

function User({ user }){
    return(
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    );
}

function UserList(){
    const users = [
        {
            id:1,username:'velopert',email:'p@gmail.com'
        },
        {
            id:2,username:'tester',email:'t@example.com'
        },
        {
            id:3,username:'liz',email:'liz@exaple.com'
        }
    ];
    return(
        <div>
            {users.map((x,i) => (
                <User user={x} key={i} />
            ))}
        </div>
    );
}

export default UserList;