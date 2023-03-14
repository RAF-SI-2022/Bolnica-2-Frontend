export interface NewEmployeeRequest {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    jmbg: string,
    residentialAddress: string,
    placeOfLiving: string,
    phone: string,
    email: string,
    title: string,
    profession: string,
    departmentId: number,
    permissions: string[]
}

export interface UpdateEmployeeRequest {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    jmbg: string,
    residentialAddress: string,
    placeOfLiving: string,
    phone: string,
    email: string,
    title: string,
    profession: string,
    username: string,
    oldPassword: string | null,
    newPassword: string | null,
    departmentId: number
}

export interface ResetPasswordResponse {
    message: string
}
