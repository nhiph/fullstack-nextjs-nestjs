
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordHelper } from '@/helpers/util';
import { JwtService } from '@nestjs/jwt';
import { CodeAuthDto, CreateAuthDto, ChangePasswordAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) return null;

    const isValidPassword = await comparePasswordHelper(pass, user.password);

    if (!isValidPassword) return null;

    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      user: {
        email: user.email,
        _id: user._id,
        name: user.name
      },
      access_token: this.jwtService.sign(payload),
    };
    // in transform.interceptor.ts this structure with be wrapped by interceptor to format more status code and message with this data to response for frontend
  }


  handleRegister = async (registerDto: CreateAuthDto) => {
    return this.usersService.handleRegister(registerDto);
  }

  checkCode = async (data: CodeAuthDto) => {
    return this.usersService.handleActive(data);
  }

  retryActive = async (email: string) => {
    return this.usersService.retryActive(email);
  }

  retryPassword = async (email: string) => {
    return this.usersService.retryPassword(email);
  }

  changePassword = async (data: ChangePasswordAuthDto) => {
    return this.usersService.changePassword(data);
  }
}
