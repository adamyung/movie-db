import React from 'react';
import { debounce } from 'lodash';

import './debounced-input.scss';

class DebouncedInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleInputDebounced = debounce(this.handleInput, 1000);
  }

  handleInput(event) {
    this.props.onInputChange(event.target.value);
  }

  onChange(event) {
    //This will ensure that the event is not pooled
    event.persist();
    this.handleInputDebounced(event);
  }

  render() {
    return (
      <input
        className="debounced-input"
        type="text"
        placeholder="Search"
        disabled={this.props.disabled}
        onChange={this.onChange}
      />
    )
  }
}

export default DebouncedInput;