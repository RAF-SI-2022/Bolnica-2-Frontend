export const BASE_URL = 'http://localhost:8081/api';
export const BASE_URL_PATIENT = 'http://localhost:8082/api'
export const LOGIN_ENDPOINT = BASE_URL + "/auth/login";
export const EMPLOYEE_ENDPOINT = BASE_URL + "/users";
export const UPDATE_PASSWORD_ENDPOINT = EMPLOYEE_ENDPOINT + '/update-password';
export const RESET_PASSWORD_ENDPOINT = EMPLOYEE_ENDPOINT + '/reset-password';
export const SCHEDULED_APPOINTMENTS_ENDPOINT = BASE_URL_PATIENT+'/sched-med-exam/search?lbz=';
export const PATIENT_BY_LBP_ENDPOINT = BASE_URL_PATIENT+'/patient/'