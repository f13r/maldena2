import React from 'react';
import { Checkbox, FormField } from 'semantic-ui-react';
import { withFormsy } from 'formsy-react';

class CheckBoxGroup extends React.Component {

  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.checked = this.props.checkedOptions;

    this.props.setValue(this.props.checkedOptions);
  }

  changeValue(e, { checked, value }) {
    checked ? this.checked.push(value) :
                  this.checked = this.checked.filter(item => item !== value)
    
    this.props.setValue(this.checked);
  }

  render() {

    const { options, checkedOptions } = this.props;
    
    return options.map((option, i) => (
      <FormField key={option.value}>
        <Checkbox
          name={'level[' + option.value + ']'}
          defaultChecked={checkedOptions.includes(option.value)}
          label={option.text}
          value={option.value}
          onChange={this.changeValue}
        />
      </FormField>
    ));
     
  }
}

export default withFormsy(CheckBoxGroup);
