

export class SignupUserDto {
    firstname: string;
    lastname: string;
    notification_token: string;
    email: string;
    password: string;
    dob: Date;
    phone_nr: string;

    constructor(firstname: string, lastname: string, notification_token: string, email: string, password: string, dob: Date, phone_nr: string) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.notification_token = notification_token;
      this.email = email;
      this.password = password;
      this.dob = dob;
      this.phone_nr = phone_nr;
    }
}
