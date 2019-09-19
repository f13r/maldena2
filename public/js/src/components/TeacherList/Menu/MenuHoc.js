import React from 'react';
import { Menu } from 'semantic-ui-react';
import SortMenuItem from './SortMenuItem';
import RadioMenuItem from "./RadioMenuItem";

const MenuHoc = (props) => {

    const getSortMenu = () => {
        return props.sortItems.map((item, index) => {
           return <SortMenuItem key={index} item={item} sortFields={props.sortFields} sortTeachers={props.sortTeachers}/>
        });
    };

    const getRadioMenu = () => {
        return props.radioItems.map((item, index) => {
            return <RadioMenuItem key={index} item={item} radioFields={props.radioFields} filterTeachers={props.filterTeachers}/>
        });
    };

    return (
        <Menu  secondary>
            <Menu.Item header>Сортивровать по </Menu.Item>
            { getSortMenu() }
            { getRadioMenu() }
        </Menu>
    );
};


export default MenuHoc;