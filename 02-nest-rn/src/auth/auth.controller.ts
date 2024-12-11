import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordAuthDto, CreateAuthDto, CodeAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '@/auth/passport/local-auth.guard';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { Public, ResponseMessage } from '@/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) { }

  @Post('login')
  @Public() // to tell this endpoint no need to check jwt AT for request
  @UseGuards(LocalAuthGuard) // only relating to login
  @ResponseMessage("Fetch login")
  handleLogin(@Request() req) { // req here is user info
    // this.authService.login is automatically implemented before login func followed by passport local
    return this.authService.login(req.user);
  }

  // guard to make sure header has authorization
  // have to declare in every enpoint => take effort => write global in main.ts or app.modules
  // @UseGuards(JwtAuthGuard) 
  @Get('profile')
  getProfile(@Request() req) { // req here is payload from validate jwt-guard
    return req.user;
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }

  @Post('check-code')
  @Public()
  checkCode(@Body() data: CodeAuthDto) {
    return this.authService.checkCode(data);
  }

  @Post('retry-active')
  @Public()
  retryActive(@Body("email") email: string) { // define dto only when obj with many fields, many data
    return this.authService.retryActive(email);
  }

  @Post('retry-password')
  @Public()
  retryPassword(@Body("email") email: string) { // define dto only when obj with many fields, many data
    return this.authService.retryPassword(email);
  }

  @Post('change-password')
  @Public()
  changePassword(@Body() data: ChangePasswordAuthDto) { // define dto only when obj with many fields, many data
    return this.authService.changePassword(data);
  }

  @Get('mail')
  @Public()
  testEmail() {
    this.mailerService
      .sendMail({
        to: 'test@nestjs.com', // list of receivers
        // from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        // html: '<b>Hello world with nhi phung huynh</b>', // HTML body content
        template: "register.hbs", // prefix from app.module with dir
        context: {
          name: 'Nhi Phung',
          activationCode: 123456789,
        },
      })
    return 'OK';
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
