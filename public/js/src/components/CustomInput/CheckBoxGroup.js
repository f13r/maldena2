import React from 'react';
import { Input } from 'formsy-semantic-ui-react';
import { Icon, Checkbox } from 'semantic-ui-react';
import { withFormsy } from 'formsy-react';

class CheckBoxGroup extends React.Component {


  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.checked = this.props.checkedOptions;
  }

  changeValue(e, { checked, value }) {
    checked ? this.checked.push(value) :
                  this.checked = this.checked.filter(item => item !== value)
    
    this.props.setValue(this.checked);
  }

  render() {

    const { options, checkedOptions } = this.props;
    
    return options.map((option, i) => (
        <Checkbox
          name={'level[' + option.value + ']'}
          defaultChecked={checkedOptions.includes(option.value)}
          key={option.value}
          label={option.text}
          value={option.value}
          onChange={this.changeValue}
        />
    ));
     
  }
}

export default withFormsy(CheckBoxGroup);
