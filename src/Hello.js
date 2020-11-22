import React from 'react';

function Hello({color, name, isSpecial}) {
  return <div style={{ color }}>
      { isSpecial && <b>*</b>}
      헬로월드 {name}
      </div>
}

Hello.defaultProps={
    name: '노프롭스'
}

export default Hello;