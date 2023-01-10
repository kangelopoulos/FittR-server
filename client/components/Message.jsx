import React from "react";


const Message = ({ message }) => {
  return (
    <p className={`error-msg`}>
      {message}
    </p>
  )
}

export default Message;