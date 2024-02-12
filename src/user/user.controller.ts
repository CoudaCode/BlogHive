import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/guard/auth.guard';
import { UserDto } from './user.dto'; // Assurez-vous que le chemin est correct
import { UserService } from './user.service';
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
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: number, @Res() res: Response, @Req() req) {
    return await this.userService.getUser(id, res, req);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: UserDto,
    @Res() res: Response,
    @Req() req,
  ) {
    return await this.userService.updateUser(id, userData, res, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number, @Res() res: Response, @Req() req) {
    return await this.userService.deleteUser(id, res, req);
  }
}
