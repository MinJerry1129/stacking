import {useEffect, useState} from "react";

function InputDecimal (props)  {
  const [input, setInput] = useState("");
  
  useEffect(() => {
    if(props.fontStyle){
      document.querySelectorAll('.Curr-input')[1].style.fontSize = '22px';
      document.querySelectorAll('.Curr-input')[1].style.paddingTop = '10px';
    }else{
      document.querySelectorAll('.Curr-input')[1].style.fontSize = '37px';
      document.querySelectorAll('.Curr-input')[1].style.paddingTop = '0';
    }
  }, [props.fontStyle]); 

  const change = e => {
    let val = e.target.value;

    val = val.replace(/([^0-9.]+)/, "");
    const match = /(\d{0,9})[^.]*((?:\.\d{0,9})?)/g.exec(val);
    const value = match[1] + match[2];

    e.target.value = value;

    setInput(value);
    props.updateVal(value);
    if (val.length > 0) {
      e.target.value = value;
      setInput(value);
      props.updateVal(value)
    }

    if(val.length > 8){
      e.target.style.fontSize = '22px';
      e.target.style.paddingTop = '10px';
    } else {
      e.target.style.fontSize = '37px';
      e.target.style.paddingTop = '0';
    }
  }

    return (
      <span>
        <input
          type="text"      
          onChange={change}
          value={props.val}
          {...props}
        />
      </span>
    );
};

export default InputDecimal;
