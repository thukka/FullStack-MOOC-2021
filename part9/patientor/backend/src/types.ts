export interface DiagnoseInterface {
    code: string;
    name: string;
    latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type SensitivePatientData = Omit<Patient, 'ssn' | 'entries' >;
export type NewPatient = Omit<Patient, 'id' | 'entries' >;