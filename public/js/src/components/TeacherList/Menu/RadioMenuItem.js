import React from 'react';
import { Menu } from 'semantic-ui-react';

const RadioMenuItem = props => {

    const { title, name } = props.item;

    return (
        <Menu.Item color='orange' active={props.radioFields.includes(name)} name={title} onClick={props.filterTeachers(name)}/>
    );
};


export default RadioMenuItem;