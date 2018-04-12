import React from 'react';

export default function InputForm(props) {

  return (
    <form onSubmit={props.handleSubmit}>
      <input type="text" onChange={(e)=>props.handleChange(e.target.value)} style={{width:'300px', margin:'30px'}}/>
      <input type="submit" value="Submit" />
    </form>
  );
  
}

