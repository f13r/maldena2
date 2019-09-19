import React from 'react';
import MaskedInput from "react-text-mask";
import { Input } from 'formsy-semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { withFormsy } from 'formsy-react';

class PhoneInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(e) {
    const phoneWithMask = e.target.value;
    const phone = phoneWithMask.replace(/\D/g, '');
    this.props.setValue(phone);
  }

  render() {
    return (
          <Input
              fluid
              required
              iconPosition='left'
              name='customPhone'
              validations="isLength:10"
              value={this.props.getValue() || ''}
              errorLabel={this.props.errorLabel}
              validationErrors={this.props.validationErrors}
              children={
                  <React.Fragment>
                      <MaskedInput
                          mask={['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                          placeholder="(063) 469-35-90"
                          value={this.props.getValue() || ''}
                          onChange={this.changeValue}
                      />
                      <Icon name='phone'/>
                  </React.Fragment>
              }
          >
          </Input>
    );
  }
}

export default withFormsy(PhoneInput);
