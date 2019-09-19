import React from 'react';
import { Card, Grid, Image, Container, List, Divider, Header, Label, Segment, Item } from 'semantic-ui-react'

const TeacherView = (props) => {

    const labelColor = 'orange';

    const getTeacherLevels = () => {
      return props.teacher.viewLevels.map((level, index) => {
          return <List.Item key={index}>{level}</List.Item>
      });
    };


    console.log(props.teacher, 'teacher');
    const { photo, name, viewExperience, lessonPrice, lessonDuration, description, education, home, venue, skype, viewLevels } = props.teacher;

    return (
        <Grid container doubling stackable>
            <Grid.Row>
                <Grid.Column width={5}>
                    <Card fluid>
                        <Image src={ photo } wrapped centered/>
                        <Card.Content>
                            <Card.Header textAlign='center'>{ name }</Card.Header>
                            <Card.Meta textAlign='center'>{ viewExperience + ' опыта' }</Card.Meta>
                        </Card.Content>
                        <Card.Content textAlign='center'>
                            <b>{ lessonPrice } грн / { lessonDuration }</b>
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
                                        { description }
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                                {!!(home || venue || skype) &&
                                    <Item>
                                        <Item.Content>
                                            <Item.Header>
                                                Место занятия
                                            </Item.Header>

                                            {!!home &&
                                                <Item.Description>
                                                    <Label color={labelColor} horizontal>
                                                        У студента
                                                    </Label> { home }
                                                </Item.Description>
                                            }


                                            {!!venue &&
                                                <Item.Description>
                                                    <Label color={labelColor} horizontal>
                                                        У преподавателя
                                                    </Label> {venue}
                                                </Item.Description>
                                            }

                                            {!!skype &&
                                                <Item.Description>
                                                    <Label color={labelColor}>По Skype</Label>
                                                </Item.Description>
                                            }
                                        </Item.Content>
                                    </Item>
                                }
                        { !!viewLevels.length &&
                            <React.Fragment>
                               <Header as='h3'>Уровни преподавания</Header>
                                <List bulleted>
                                    { getTeacherLevels() }
                                </List>
                            </React.Fragment>
                        }
                        <Header as='h3'>Образование</Header>
                        <p>
                             { education }
                        </p>
                        </Item.Group>
                    </Container>
                </Grid.Column>
            </Grid.Row>

            <Divider section>  </Divider>
        </Grid>
    );

};

export default TeacherView;