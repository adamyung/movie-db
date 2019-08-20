import React from 'react';

function FourOFour(props) {
  function goBack() {
    props.history.goBack();
  }

  return (
    <div>
      <h1>Page not found!</h1>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}

export default FourOFour;