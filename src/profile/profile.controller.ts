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
import { profileDto } from './../dtos/profile.dto';
import { ProfileService } from './profile.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('user')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @UseGuards(AuthGuard)
  @Post(':id/profile')
  createProfile(
    @Param('id') id: number,
    @Body() profileData: profileDto,
    @Res() res: Response,
    @Req() req,
  ) {
    return this.profileService.createProfile(id, profileData, res, req);
  }

  @UseGuards(AuthGuard)
  @Put(':id/profile')
  updateProfile(
    @Param('id') id: number,
    @Body() profileData: profileDto,
    @Res() res: Response,
    @Req() req,
  ) {
    return this.profileService.updateProfile(id, profileData, res, req);
  }

  @UseGuards(AuthGuard)
  @Get(':id/profile')
  getProfile(@Param('id') id: number, @Res() res: Response, @Req() req) {
    return this.profileService.getProfile(id, res, req);
  }
  @UseGuards(AuthGuard)
  @Delete(':id/profile')
  deleteProfile(@Param('id') id: number, @Res() res: Response, @Req() req) {
    return this.profileService.deleteProfile(id, res, req);
  }
}
