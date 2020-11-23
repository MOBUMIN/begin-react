import React, {useState} from 'react';

// input 에 입력하는 값이 하단에 나타나게 하고, 초기화 버튼을 누르면 input 이 값이 비워지도록
function InputSample(){
    const [text,setText] = useState('');

    const onChange = (e) =>{
        setText(e.target.value);
    }
    
    const onReset=()=>{
        setText('');
    }
    return(
        <div>
            <input onChange={onChange} value={text} />
            <button onClick={onReset}>reset</button>
            <div>
                <b>value : {text}</b>
            </div>
        </div>
    );
}

export default InputSample;