import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: 'email khong duoc de trong' })
    email: string;

    @IsNotEmpty({ message: 'password khong duoc de trong' })
    password: string;

    @IsOptional()
    name: string;
}

export class CodeAuthDto {
    @IsNotEmpty({ message: '_id khong duoc de trong' })
    _id: string;

    @IsNotEmpty({ message: 'code khong duoc de trong' })
    code: string;
}

export class ChangePasswordAuthDto {
    @IsNotEmpty({ message: "code không được để trống" })
    code: string;

    @IsNotEmpty({ message: "password không được để trống" })
    password: string;

    @IsNotEmpty({ message: "confirmPassword không được để trống" })
    confirmPassword: string;

    @IsNotEmpty({ message: "email không được để trống" })
    email: string;
}
