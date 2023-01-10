import React from "react";


const Message = ({ message, error }) => {
  return (
    <p className={`error_${error}`}>
      {message}
    </p>
  )
}

export default Message;