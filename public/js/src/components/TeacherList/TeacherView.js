import React from 'react';
import {
    Card,
    Grid,
    Image,
    Container,
    List,
    Divider,
    Header,
    Label,
    Item
} from 'semantic-ui-react'

const TeacherView = (props) => {

    console.log(props);
    const labelColor = 'orange';
    const {
        photo,
        name,
        viewExperience,
        lessonPrice,
        viewLessonDuration,
        description,
        education,
        home,
        venue,
        skype,
        showHome,
        showVenue,
        showSkype,
        viewLevels
    } = props.teacher;

    const getTeacherLevels = () => {
        return props.teacher.viewLevels.map((level, index) => {
            return <List.Item key={index}>{level}</List.Item>
        });
    };

    const isItemsEmpty = items => {
        return !React.Children.toArray(items.props.children).length;
    };

    const getViewExperience = () => !!viewExperience && viewExperience + ' опыта';
    const getViewLessonPrice = () => !!lessonPrice && !!viewLessonDuration && lessonPrice + ' грн / ' + viewLessonDuration;

    console.log(showSkype, !!(showHome || showVenue || showSkype), 'showskype')

    const viewItems = (
            <React.Fragment>
            {!!description &&
            <Item>
                <Item.Content>
                    <Item.Header>
                        О преподавателе
                    </Item.Header>
                    <Item.Description>
                        {description}
                    </Item.Description>
                </Item.Content>
            </Item>
            }
            {!!(showHome || showVenue || showSkype) && <Item>
                <Item.Content>
                    <Item.Header>
                        Место занятия
                    </Item.Header>

                    {!!showHome && !!home && <Item.Description>
                        <Label color={labelColor} horizontal>
                            У преподавателя
                        </Label>
                        {home}
                    </Item.Description>
                    }

                    {!!showVenue && !!venue && <Item.Description>
                        <Label color={labelColor} horizontal>
                            У студента
                        </Label>
                        {venue}
                    </Item.Description>
                    }

                    {!!showSkype && !!skype && <Item.Description>
                        <Label color={labelColor}>По Skype</Label>
                    </Item.Description>
                    }
                </Item.Content>
            </Item>
            }

            {!!viewLevels.length && <React.Fragment>
                <Header as='h3'>Уровни преподавания</Header>
                <List bulleted>
                    {getTeacherLevels()}
                </List>
            </React.Fragment>
            }

            { !!education && <React.Fragment>
                <Header as='h3'>Образование</Header>
                <p>
                    {education}
                </p>
            </React.Fragment>
            }
        </React.Fragment>
    );

    console.log(viewItems);



    return (
        <Grid container doubling stackable>
            <Grid.Row>
                <Grid.Column width={5}>
                    <Card fluid>
                        <Image src={photo} wrapped centered/>
                        <Card.Content>
                            <Card.Header textAlign='center'>{name}</Card.Header>
                            <Card.Meta textAlign='center'>{getViewExperience()}</Card.Meta>
                        </Card.Content>
                        { getViewLessonPrice() &&
                            <Card.Content textAlign='center'>
                                <b>{getViewLessonPrice()}</b>
                            </Card.Content>
                        }
                    </Card>
                </Grid.Column>
                <Grid.Column width={11}>
                    <Container fluid>
                        <Item.Group>
                            {
                                isItemsEmpty(viewItems) ?
                                    <p>Начните заполнять форму и увидите как вас будут видеть студенты на вкладке <b>"Учителя"</b></p> :
                                    viewItems
                            }
                        </Item.Group>
                    </Container>
                </Grid.Column>
            </Grid.Row>

            <Divider section></Divider>
        </Grid>
    );

};

export default TeacherView;
