export const USER_URL = 'http://localhost:8081/api';
export const PATIENT_URL = 'http://localhost:8082/api';
export const LABORATORY_URL = 'http://localhost:8083/api';

export const LOGIN_ENDPOINT = USER_URL + "/auth/login";
export const EMPLOYEE_ENDPOINT = USER_URL + "/users";
export const UPDATE_PASSWORD_ENDPOINT = EMPLOYEE_ENDPOINT + '/update-password';
export const RESET_PASSWORD_ENDPOINT = EMPLOYEE_ENDPOINT + '/reset-password';
export const PATIENT_ENDPOINT = PATIENT_URL + "/patient";
export const SCHED_MED_EXAM_ENDPOINT = PATIENT_URL + "/sched-med-exam";
export const HEALTH_RECORD_ENDPOINT = PATIENT_URL + "/record";
export const SCHED_LAB_EXAM_ENDPOINT = LABORATORY_URL + "/scheduled";
export const CANCEL_LAB_EXAM_ENDPOINT = LABORATORY_URL + "/status";//promeni