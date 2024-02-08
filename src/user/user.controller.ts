import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { UserDto } from './user.dto'; // Assurez-vous que le chemin est correct
import { UserService } from './user.service';
import { Response } from 'express';
import { get } from 'http';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: UserDto, @Res() res: Response) {
    return await this.userService.createUser(userData, res);
  }
  @Get()
  async getAllUsers(@Res() res: Response) {
    return await this.userService.getAllUsers(res);
  }
  @Post('login')
  async login(@Body() userData: UserDto, @Res() res: Response) {
    return await this.userService.login(userData, res);
  }
}
