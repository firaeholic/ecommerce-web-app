export default class loginData{
    [key: string]: any;
    email!: string;
    password!: string;
    data!: {
        message: string;
        status: number;
        result: {
            token: string;
            user: {
                id: number;
                userName: string;
                email: string;
                password: string;
                role: string;
                businessLicenseFilePath: string
                isVerified: boolean,
                isLicenseApproved: boolean
                phoneNumber: string,
                phoneNumberVerified: boolean,
                created: string,
                lastModified: string
            }
        }
        resultType: string;
    }
}