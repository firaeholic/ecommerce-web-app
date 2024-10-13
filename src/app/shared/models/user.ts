export default class UserModel{
    [key: string]: any;
    userName!: string;
    role!: string;
    email!: string;
    password!: string;
    businessLicenseFile!: File;
    name!: string;
    businessLicenseFilePath!: string;
    isVerified!: boolean;
    isLicenseApproved!: boolean;
    phoneNumber!: string | null;
    phoneNumberVerified!: boolean;
    id!: number;
    created!: string;
    lastModified!: string;
    user!: {
        id: number;
        name: string;
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

export class Users{
    users!: UserModel[];
}
  

export class RegisterUserModel{
    [key: string]: any;
    userName!: string;
    role!: string;
    email!: string;
    password!: string;
    businessLicenseFile!: File;
}

export class CurrentUserModel{
    [key: string]: any;
    id!: number;
    name!: string;
    userName!: string;
    password!: string;
    email!: string;
    role!: string;
    businessLicenseFilePath!: string;
    isVerified!: boolean;
    isLicenseApproved!: boolean;
    phoneNumber!: string;
    phoneNumberVerified!: boolean;
    created!: string;
    lastModified!: string;
}

export class UpdateUserModel {
    id!: number;
    name?: string | null;
    userName?: string  | null;
    email?: string  | null;
    password?: string  | null;
    role?: string  | null; 
    phoneNumber?: string  | null;
    businessLicenseFile?: File  | null;
  }

export class VerifyUserModel {
    id!: number;
    role!: string;
    isVerified!: boolean;
    isLicenseApproved!: boolean;
    phoneNumberVerified!: boolean;
  }