import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';


const SortMenuItem = props => {

    const iconDirection = {
        asc: 'up',
        desc: 'down'
    };

    const getIconNameByDirection = (direction) => {

        if (typeof iconDirection[direction] !== 'undefined') {
            return iconDirection[direction];
        }

        return '';
    };

    const getIcon = (fieldName) => {
        const direction = props.sortFields[fieldName];
        return typeof direction !== 'undefined' && <Icon name={'long arrow alternate ' +  getIconNameByDirection(direction) } size='small' />
    };

    const { name, title } = props.item;

    return (
        <Menu.Item onClick={props.sortTeachers(name)}>
            { title }
            { getIcon(name) }
        </Menu.Item>
    );
};


export default SortMenuItem;