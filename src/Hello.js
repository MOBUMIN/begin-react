import React, { Component } from 'react';

class Hello extends Component{
    static defaultProps = {
        name: '노프롭스'
    }
    render(){
        const {color,name,isSpecial} = this.props;
        return(
            <div style = {{color}}>
                {isSpecial && <b>*</b>}
                Hello {name}
            </div>
        );
    }
}


export default Hello;