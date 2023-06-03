import { environment } from "src/environments/environment";

export let USER_URL: string;
export let PATIENT_URL: string;
export let LAB_URL: string;

console.log(environment);

if (environment.production) {
    if (environment.https) {
        USER_URL = 'https://bolnica-2.k8s.elab.rs/api/user';
        PATIENT_URL = 'https://bolnica-2.k8s.elab.rs/api/patient';
        LAB_URL = 'https://bolnica-2.k8s.elab.rs/api/lab';
    } else {
        USER_URL = 'http://bolnica-2.k8s.elab.rs/api/user';
        PATIENT_URL = 'http://bolnica-2.k8s.elab.rs/api/patient';
        LAB_URL = 'http://bolnica-2.k8s.elab.rs/api/lab';
    }
} else {
    if (environment.dev) {
        if (environment.https) {
            USER_URL = 'https://bolnica-2-dev.k8s.elab.rs/api/user';
            PATIENT_URL = 'https://bolnica-2-dev.k8s.elab.rs/api/patient';
            LAB_URL = 'https://bolnica-2-dev.k8s.elab.rs/api/lab';
        } else {
            USER_URL = 'http://bolnica-2-dev.k8s.elab.rs/api/user';
            PATIENT_URL = 'http://bolnica-2-dev.k8s.elab.rs/api/patient';
            LAB_URL = 'http://bolnica-2-dev.k8s.elab.rs/api/lab';
        }
    } else {
        USER_URL = 'http://localhost:8081/api';
        PATIENT_URL = 'http://localhost:8082/api';
        LAB_URL = 'http://localhost:8083/api';
    }
}

export const LOGIN_ENDPOINT = USER_URL + "/auth/login";
export const EMPLOYEE_ENDPOINT = USER_URL + "/users";
export const UPDATE_PASSWORD_ENDPOINT = EMPLOYEE_ENDPOINT + '/update-password';
export const RESET_PASSWORD_ENDPOINT = EMPLOYEE_ENDPOINT + '/reset-password';
export const PATIENT_ENDPOINT = PATIENT_URL + "/patient";
export const SCHED_MED_EXAM_ENDPOINT = PATIENT_URL + "/sched-med-exam";
export const HEALTH_RECORD_ENDPOINT = PATIENT_URL + "/record";
export const SCHED_LAB_EXAM_ENDPOINT = LAB_URL + "/examination";
export const SCHEDULE_ENDPOINT = PATIENT_URL + '/sched-med-exam';
export const ORDER_ENDPOINT = LAB_URL+"/order";
export const REFERRAL_ENDPOINT = LAB_URL+"/referral"
export const CREATE_SCHEDULE_ENDPOINT = SCHEDULE_ENDPOINT + '/create';
export const HOSPITALIZATION_ENDPOINT = PATIENT_URL+'/hospitalization'

export const BIOCHEM_ENDPOINT = LAB_URL+'/order';