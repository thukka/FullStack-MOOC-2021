import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { TextField, DiagnosisSelection } from './EntryFormField';
import { Diagnosis, HealthTypes } from '../types';
import { useStateValue } from '../state';

interface Props {
    onSubmit: (values: BasicOccupationalEntry) => void;
    onCancel: () => void;
}

export interface BasicOccupationalEntry {
    id: string;
    type: HealthTypes;
    date: string;
    description: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
    employerName: string;
    sickLeaveStartDate: string;
    sickLeaveEndDate: string;
}

export const AddOccupationalForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                id: "",
                description: "",
                date: "",
                specialist: "",
                type: HealthTypes.OccupationalHealthcare,
                employerName: "",
                sickLeaveStartDate: "",
                sickLeaveEndDate: ""
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.id) {
                    errors.id = requiredError;
                }
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="ID"
                            placeholder="ID"
                            name="id"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Sick leave start date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeaveStartDate"
                            component={TextField}
                        />
                        <Field
                            label="Sick leave end date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeaveEndDate"
                            component={TextField}
                        />
                        <Field
                            label="Employer"
                            placeholder="Employer"
                            name="employerName"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                  </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                  </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};