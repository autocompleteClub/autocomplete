import React from 'react';

export default function InputForm(props) {

  return (
    <form onSubmit={props.handleSubmit}>
      <input type="text" onChange={props.handleChange} style={{width:'300px'}}/>
      <input type="submit" value="Submit" />
    </form>
  );
  
}

