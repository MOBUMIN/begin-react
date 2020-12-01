import React from 'react';

function ErrorCheck({variable}){
    // if(!variable){
    //     return <div> no variable . . . loading . . .</div>;
    // }
    return(
        <div>
            <div>
                <b>ERROR</b>: {variable.check}
            </div>
            <div>
                <b>ErrorName</b>: {variable.name}
            </div>
        </div>
    );
}

export default ErrorCheck;