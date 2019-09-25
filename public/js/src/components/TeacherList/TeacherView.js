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

    const getViewExperience = () => !!viewExperience && viewExperience + ' опыта';
    const getViewLessonPrice = () => !!lessonPrice && !!viewLessonDuration && lessonPrice + 'грн / ' + viewLessonDuration;


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
                        <Card.Content textAlign='center'>
                            <b>{getViewLessonPrice()}</b>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={11}>
                    <Container fluid>
                        <Item.Group>
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
                            <Header as='h3'>Образование</Header>
                            <p>
                                {education}
                            </p>
                        </Item.Group>
                    </Container>
                </Grid.Column>
            </Grid.Row>

            <Divider section></Divider>
        </Grid>
    );

};

export default TeacherView;
