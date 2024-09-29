export default class UserModel{
    [key: string]: any;
    userName!: string;
    role!: string;
    email!: string;
    password!: string;
    access_token!: string;
    businessLicenseFile!: File;
    user!: {
        id: number;
        userName: string;
        email: string;
        password: string;
        role: string;
        businessLicenseFilePath: string
		isVerified: false,
		isLicenseApproved: boolean
		phoneNumber: string,
		phoneNumberVerified: boolean,
		created: string,
		lastModified: string
    }
}

export class RegisterUserModel{
    [key: string]: any;
    userName!: string;
    role!: string;
    email!: string;
    password!: string;
    businessLicenseFile!: File;
}