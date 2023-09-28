import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class AddUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  username: string;

  @MinLength(8)
  @Matches(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[^\w\d\s]).{8,}$'),
    {
      message: 'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    }
  )
  password: string;

  @MinLength(8)
  @Matches(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[^\w\d\s]).{8,}$'),
    {
      message: 'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    }
  )
  confPassword: string;
}

export class LoginDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class changePasswordDTO {
  @IsEmail()
  username: string;

  @MinLength(8)
  @Matches(
    new RegExp('((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'),
    {
      message: 'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character'
    }
  )
  oldPassword: string;
  
  @MinLength(8)
  @Matches(
    new RegExp('((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'),
    {
      message: 'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character'
    }
  )
  newPassword: string;
}
export class ResetPasswordDTO {
  @IsString()
  oldPassword: string;

  @MinLength(8)
  @Matches(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[^\w\d\s]).{8,}$'),
    {
      message: 'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    }
  )
  newPassword: string;
}
