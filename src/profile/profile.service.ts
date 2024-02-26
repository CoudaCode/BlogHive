import { Body, Injectable, Param, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { profileDto } from './../dtos/profile.dto';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createProfile(
    @Param() id: number,
    profileData: profileDto,
    @Res() res: Response,
    @Req() req,
  ) {
    try {
      const { firstName, lastName, sex, birthDate, bio } = profileData;

      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return res
          .status(404)
          .json({ statut: false, message: 'User not found' });
      }

      const existProfile = await this.profileRepository.findOne({
        where: { user },
      });
      if (existProfile) {
        return res
          .status(400)
          .json({ statut: false, message: 'Profile already exists' });
      }
      if (id != req.user.payload.id) {
        return res
          .status(400)
          .json({ statut: false, message: 'You are not authorized' });
      }

      const newProfile = this.profileRepository.create({
        user,
        firstName,
        lastName,
        sex,
        birthDate,
        bio,
      });

      const profile = await this.profileRepository.save(newProfile);
      if (profile) {
        return res.status(201).json({ statut: true, message: profile });
      }
      return res.status(400).json({ message: 'Profile not created' });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async updateProfile(
    @Param() id: number,
    @Body() profileData: profileDto,
    @Res() res: Response,
    @Req() req,
  ) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return res
          .status(404)
          .json({ statut: false, message: 'User not found' });
      }

      const existProfile = await this.profileRepository.findOne({
        where: { user },
      });
      if (!existProfile) {
        return res
          .status(400)
          .json({ statut: false, message: 'Profile not exist' });
      }

      if (id != req.user.payload.id) {
        return res
          .status(400)
          .json({ statut: false, message: 'You are not authorized' });
      }

      const updatedProfile = await this.profileRepository.update(
        { user },
        profileData,
      );

      if (updatedProfile) {
        return res
          .status(200)
          .json({ statut: true, message: 'Profile updated' });
      }
      return res.status(400).json({ message: 'Profile not updated' });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  async getProfile(@Param() id: number, @Res() res: Response, @Req() req) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return res
          .status(404)
          .json({ statut: false, message: 'User not found' });
      }

      if (id != req.user.payload.id) {
        return res
          .status(400)
          .json({ statut: false, message: 'You are not authorized' });
      }
      const profile = await this.profileRepository.findOne({
        where: { user },
      });
      if (!profile) {
        return res
          .status(404)
          .json({ statut: false, message: 'Profile not found' });
      }
      return res.status(200).json({ statut: true, message: profile });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  async deleteProfile(@Param() id: number, @Res() res: Response, @Req() req) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return res
          .status(404)
          .json({ statut: false, message: 'User not found' });
      }

      if (id != req.user.payload.id) {
        return res
          .status(400)
          .json({ statut: false, message: 'You are not authorized' });
      }
      const profile = await this.profileRepository.findOne({
        where: { user },
      });
      if (!profile) {
        return res
          .status(404)
          .json({ statut: false, message: 'Profile not found' });
      }
      const deletedProfile = await this.profileRepository.delete({ user });
      if (deletedProfile) {
        return res
          .status(200)
          .json({ statut: true, message: 'Profile deleted' });
      }
      return res.status(400).json({ message: 'Profile not deleted' });
    } catch (e) {
      return res.status(500).json({ statut: false, message: e.message });
    }
  }
}
