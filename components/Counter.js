import React from 'react';

function Counter(props) {
  return (
    <div className="counter d-none d-md-flex justify-content-center">
        <a href="/#">{props.number}</a>
    </div>
  );
}

export default Counter;
