import React from 'react';
import { Form, Input, Select,  Checkbox, TextArea } from 'formsy-semantic-ui-react';
import {Grid, Image, Divider, Button, FormGroup, Label, Header, Icon } from 'semantic-ui-react';
import PhoneInput from '../CustomInput/PhoneInput';
import CheckBoxGroup from '../CustomInput/CheckBoxGroup';

const NewTeacherForm = (props) => {

    const errorLabel = <Label color="red" pointing/>;

    const {
        id,
        showHome, showVenue, showSkype,
        home, venue, skype,
        name, phone, email,
        experience, education, photo,
        description, lessonPrice, lessonDuration
    } = props.teacher;

    const { levels, teacherExperiences, lessonDurations } = props.options;


    return (
            <Form onValidSubmit={ props.submitTeacher } onChange={ props.onTeacherChange }>
                <Grid container doubling stackable>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image
                                centered
                                src={photo}
                                />
                                <div style={{'display':'none'}}>
                                    <Input type='hidden' name='photo' value={photo}/>
                                    <Input type='hidden' name='id' value={id}/>
                                </div>
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <FormGroup widths='equal'>
                                <Input fluid
                                       iconPosition='left'
                                       icon='user'
                                       name='name'
                                       required
                                       value={name}
                                       errorLabel={errorLabel}
                                       validationErrors={{
                                           isDefaultRequiredValue: 'Нам нужно ваше имя, оде...',
                                       }}
                                       placeholder='Имя и Фамилия'/>
                                <PhoneInput
                                  required
                                  name='phone'
                                  value={phone}
                                  validationErrors={{
                                    isDefaultRequiredValue: 'Нам нужен ваш телефон',
                                    isLength: 'Некоректний телефон'
                                   }}
                                  errorLabel={errorLabel}
                                  />
                            </FormGroup>
                            <FormGroup widths='equal'>
                                <Input
                                    fluid
                                    value={email}
                                    validations="isEmail"
                                    required
                                    iconPosition='left'
                                    icon='at'
                                    type='email'
                                    name='email'
                                    errorLabel={errorLabel}
                                    validationErrors={{
                                      isDefaultRequiredValue: 'Нам нужен ваш E-mail',
                                      isEmail: 'Некоректний E-mail'
                                     }}
                                    placeholder='E-mail'/>
                                <Select
                                    fluid
                                    label='Опыт работы'
                                    value={experience}
                                    name='experience'
                                    options={teacherExperiences}
                                    placeholder='Опыт работы'
                                    >
                                </Select>
                            </FormGroup>
                            <FormGroup widths='equal'>
                                <TextArea
                                    errorLabel={errorLabel}
                                    required
                                    validationErrors={{
                                      isDefaultRequiredValue: 'Расскажите больше о своем образовании',
                                    }}
                                    value={education}
                                    name='education'
                                    placeholder='Расскажите о своем образовании'>
                                </TextArea>
                            </FormGroup>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider horizontal section>
                    <Header as='h5'>
                        <Icon name='student' />
                        Об уроках
                    </Header>
                </Divider>
                <Grid container doubling stackable>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Select
                                fluid
                                value={lessonDuration}
                                options={lessonDurations}
                                placeholder='Длинна урока'
                                name='lessonDuration'>
                            </Select>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Input
                                fluid
                                required
                                type='number'
                                label={{ basic: true, content: 'грн.' }}
                                labelPosition='right'
                                validations="isNumeric"
                                errorLabel={errorLabel}
                                validationErrors={{
                                  isDefaultRequiredValue: 'Напишите цену за урок',
                                  isNumeric: 'Проверьте цену',
                                }}
                                value={lessonPrice}
                                name='lessonPrice'
                                placeholder='Цена одного урока'/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Checkbox
                                label='Я могу проводить уроки у студента дома'
                                name='showVenue'
                                defaultChecked={showVenue}
                            />
                            <TextArea
                                disabled={!showVenue}
                                label='Районы'
                                value={venue}
                                name='venue'
                                placeholder='Районы города где вы можете проводить уроки'
                            />
                            <Checkbox
                                label='Я могу проводить уроки у себя дома'
                                defaultChecked={showHome}
                                name='showHome'
                            />
                            <TextArea
                                disabled={!showHome}
                                label='Домашний адрес'
                                value={home}
                                name='home'
                                placeholder="Район, где находится ваш дом"
                            />
                            <Checkbox
                                label='Я могу проводить уроки по Skype'
                                name='showSkype'
                                defaultChecked={showSkype}
                            />
                            <Input
                                disabled={!showSkype}
                                fluid
                                value={skype}
                                iconPosition='left'
                                icon='skype'
                                name='skype'
                                placeholder='Skype адрес'/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider horizontal section>
                    <Header as='h5'>
                        <Icon name='tasks'/>
                        Уровни преподования
                    </Header>
                </Divider>
                <Grid container doubling stackable>
                    <Grid.Row>
                        <Grid.Column>
                                <CheckBoxGroup
                                    name='levels'
                                    checkedOptions={props.teacher.levels}
                                    options={levels}
                                    />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider horizontal section>
                    <Header as='h5'>
                        <Icon name='user'/>
                        О себе
                    </Header>
                </Divider>
                <Grid container doubling stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <TextArea
                                value={description}
                                required
                                validationErrors={{
                                  isDefaultRequiredValue: 'Расскажите больше о себе',
                                }}
                                name='description'
                                placeholder='Напишите о себе, чтобы заинтерисовать возможных студентов и выбрать именно вас для обучения'
                             />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider horizontal section>
                    <Header as='h5'>
                        <Icon name='address card' />
                        Так вас будут видеть студенты
                    </Header>
                </Divider>
                <Grid container doubling stackable>
                    <Grid.Row>
                        <Grid.Column>
                            { props.teacherView }
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <Button
                              color='orange'
                              size='large'
                              type='submit'>
                              Сохранить
                            </Button>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
        </Form>
      );
}

export default NewTeacherForm;
