import React from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  TextArea
} from "formsy-semantic-ui-react";
import {
  Grid,
  Image,
  Icon,
  Divider,
  Button,
  FormGroup,
  Label
} from "semantic-ui-react";
import PhoneInput from "../CustomInput/PhoneInput";
import CheckBoxGroup from "../CustomInput/CheckBoxGroup";
import {addValidationRule, validationRules} from "formsy-react";

const NewTeacherForm = props => {
  addValidationRule("ifCheckedRequired", function(values, value, otherField) {
    if (!!values[otherField]) {
      return !!value;
    }
  });

  const errorLabel = <Label color="red" pointing />;

  const {
    showHome,
    showVenue,
    showSkype,
    home,
    venue,
    skype,
    name,
    phone,
    email,
    experience,
    education,
    photo,
    description,
    lessonPrice,
    lessonDuration
  } = props.teacher;

  const {levels, teacherExperiences, lessonDurations} = props.options;

  return (
    <Form onValidSubmit={props.submitTeacher} onChange={props.onTeacherChange}>
      <Grid container doubling stackable>
        <Grid.Row>
          <Grid.Column width={5}>
            <Image centered src={photo} />
            <Input type="hidden" name="photo" value={photo} />
          </Grid.Column>
          <Grid.Column width={11}>
            <FormGroup widths="equal">
              <Input
                fluid
                iconPosition="left"
                name="name"
                required
                value={name}
                errorLabel={errorLabel}
                validationErrors={{
                  isDefaultRequiredValue: "Нам нужно ваше имя, оде..."
                }}
                placeholder="Имя и Фамилия"
              >
                <Icon name="user" />
                <input />
              </Input>
              <PhoneInput
                required
                name="phone"
                value={phone}
                validationErrors={{
                  isDefaultRequiredValue: "Нам нужен ваш телефон",
                  isLength: "Некоректний телефон"
                }}
                errorLabel={errorLabel}
              />
            </FormGroup>
            <FormGroup widths="equal">
              <Input
                fluid
                value={email}
                validations="isEmail"
                required
                iconPosition="left"
                type="email"
                name="email"
                errorLabel={errorLabel}
                validationErrors={{
                  isDefaultRequiredValue: "Нам нужен ваш E-mail",
                  isEmail: "Некоректний E-mail"
                }}
                placeholder="E-mail"
              >
                <Icon name="at" />
                <input />
              </Input>
              <Select
                fluid
                label="Опыт работы"
                value={experience}
                name="experience"
                placeholder={teacherExperiences[0].text}
                options={teacherExperiences}
                required
                errorLabel={errorLabel}
                validationErrors={{
                  isDefaultRequiredValue: "Ваш опыт работы"
                }}
              ></Select>
            </FormGroup>
            <FormGroup widths="equal">
              <TextArea
                errorLabel={errorLabel}
                required
                validationErrors={{
                  isDefaultRequiredValue:
                    "Расскажите больше о своем образовании"
                }}
                value={education}
                name="education"
                placeholder="Расскажите о своем образовании"
              ></TextArea>
            </FormGroup>
          </Grid.Column>
        </Grid.Row>
        <Divider horizontal>Об уроках</Divider>
        <Grid.Row>
          <Grid.Column width={8}>
            <Select
              fluid
              value={lessonDuration}
              required
              errorLabel={errorLabel}
              validationErrors={{
                isDefaultRequiredValue: "Длина урока"
              }}
              options={lessonDurations}
              placeholder={lessonDurations[0].text}
              name="lessonDuration"
            ></Select>
          </Grid.Column>
          <Grid.Column width={8}>
            <Input
              fluid
              iconPosition="left"
              required
              validations="isNumeric"
              errorLabel={errorLabel}
              validationErrors={{
                isDefaultRequiredValue: "Напишите цену за урок",
                isNumeric: "Проверьте цену"
              }}
              value={lessonPrice}
              name="lessonPrice"
              placeholder="Цена одного урока"
            >
              <Icon name="money" />
              <input />
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Checkbox
              label="Я могу проводить уроки у студента дома"
              name="showVenue"
              defaultChecked={showVenue}
            />
            <TextArea
              validations="ifCheckedRequired:showVenue"
              errorLabel={errorLabel}
              validationErrors={{
                ifCheckedRequired: "Введите районы",
              }}
              disabled={!showVenue}
              label="Районы"
              value={venue}
              name="venue"
              placeholder="Районы города где вы можете проводить уроки"
            />
            <Checkbox
              label="Я могу проводить уроки у себя дома"
              defaultChecked={showHome}
              name="showHome"
            />
            <TextArea
              validations="ifCheckedRequired:showHome"
              validationErrors={{
                ifCheckedRequired: "Введите домашний адрес",
              }}
              errorLabel={errorLabel}
              disabled={!showHome}
              label="Домашний адрес"
              value={home}
              name="home"
              placeholder="Район, где находится ваш дом"
            />
            <Checkbox
              label="Я могу проводить уроки по Skype"
              name="showSkype"
              defaultChecked={showSkype}
            />
            <Input
              validations="ifCheckedRequired:showSkype"
              validationErrors={{
                ifCheckedRequired: "Введите Skype",
              }}
              errorLabel={errorLabel}
              disabled={!showSkype}
              label="Домашний адрес"
              fluid
              value={skype}
              iconPosition="left"
              type="skype"
              name="skype"
              placeholder="Skype адрес"
            >
              <Icon name="skype" />
              <input />
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Divider horizontal>Уровни преподования</Divider>
        <Grid.Row>
          <Grid.Column>
            <CheckBoxGroup
              name="levels"
              checkedOptions={props.teacher.levels}
              options={levels}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <TextArea
              value={description}
              required
              validationErrors={{
                isDefaultRequiredValue: "Расскажите больше о себе"
              }}
              name="description"
              placeholder="Напишите о себе, чтобы заинтерисовать возможных студентов"
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Button type="submit">Сохранить</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default NewTeacherForm;
