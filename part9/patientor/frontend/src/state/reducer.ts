import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENT_VIEW";
    payload: Patient;
  }
  | {
    type: 'SET_DIAGNOSES_LIST';
    payload: Diagnosis[];
  }
  ;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_VIEW":
      return {
        ...state,
        patient: {
          id: action.payload.id,
          name: action.payload.name,
          occupation: action.payload.occupation,
          gender: action.payload.gender,
          ssn: action.payload.ssn ? action.payload.ssn : '',
          dateOfBirth: action.payload.dateOfBirth ? action.payload.dateOfBirth : '',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          entries: action.payload.entries ? action.payload.entries : [],
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state, diagnoses:
          [...action.payload]
      };
    default:
      return state;
  }
};

// action creators
export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi
  };
};

export const setPatientView = (patientFromApi: Patient): Action => {
  return {
    type: 'SET_PATIENT_VIEW',
    payload: patientFromApi
  };
};

export const addPatient = (patientFromApi: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patientFromApi
  };
};

export const setDiagnoses = (diagnosesListFromApi: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload: diagnosesListFromApi
  };
};