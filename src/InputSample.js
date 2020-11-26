import React, {useState, useRef} from 'react';

// input 에 입력하는 값이 하단에 나타나게 하고, 초기화 버튼을 누르면 input 이 값이 비워지도록
function InputSample(){
    const [inputs, setInputs] = useState({
        input1 : '', input2: ''
    })
    const oneInput=useRef();
    const {input1,input2} = inputs;

    const onChange = (e) =>{
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    
    const onReset=()=>{
        setInputs({
            input1: '', input2: '',
        });
        oneInput.current.focus();
    }

    return(
        <div>
            <input 
            name="input1"
            placeholder="인풋1"
            onChange={onChange}
            value={input1}
            ref={oneInput}
            />
            <input name="input2" placeholder="인풋2" onChange={onChange} value={input2}/>
            <button onClick={onReset}>reset</button>
            <div>
                <b>value : </b>
                {input1} ({input2})
            </div>
        </div>
    );
}

export default InputSample;