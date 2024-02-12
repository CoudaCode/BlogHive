import { Body, Injectable, Param, Req, Res, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { generateToken } from 'src/utils/Token';
import { comparePassword, hashPassword } from 'src/utils/hash';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/guard/auth.guard';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(@Body() userData: UserDto, @Res() res: Response) {
    try {
      const { username, password, email } = userData;
      const existUser = await this.userRepository.findOne({
        where: { username },
      });
      if (existUser) {
        return res
          .status(400)
          .json({ statut: false, message: 'User already exists' });
      }
      const newUser = this.userRepository.create({
        username,
        password: await hashPassword(password),
        email,
      });
      const user = await this.userRepository.save(newUser);
      if (newUser) {
        return res.status(201).json({ statut: true, message: user });
      }
      return res.status(400).json({ message: 'User not created' });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async getAllUsers(@Res() res: Response) {
    try {
      const users = await this.userRepository.find();
      if (!users) {
        return res
          .status(404)
          .json({ statut: false, message: 'No user found' });
      }
      return res.status(200).json({ statut: true, message: users });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  async login(@Body() userData: UserDto, @Res() res: Response) {
    try {
      const { username, password } = userData;

      const user = await this.userRepository.findOne({
        where: { username },
      });
      if (!user) {
        return res
          .status(404)
          .json({ statut: false, message: 'User not found' });
      }

      const isMatch = await comparePassword(password, user.password);

      if (username !== user.username || !isMatch) {
        return res
          .status(400)
          .json({ statut: false, message: 'Email or password incorrect' });
      }

      const token = generateToken(user, this.configService);
      res.cookie('user', token, { httpOnly: true });
      res.status(200).json({
        statut: true,
        message: { ...user, token },
      });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  async logout(@Res() res: Response) {
    try {
      res.clearCookie('user');
      res.status(200).json({ statut: true, message: 'User logout' });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  @UseGuards(AuthGuard)
  async getUser(@Param('id') id: number, @Res() res: Response, @Req() req) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
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
      return res.status(200).json({ statut: true, message: user });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }

  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id') id: number,
    @Body() userData: UserDto,
    @Res() res: Response,
    @Req() req,
  ) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });

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

      await this.userRepository.update(id, {
        ...userData,
        password: await hashPassword(userData.password),
      });
      return res.status(200).json({ statut: true, message: 'User updated' });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: number, @Res() res: Response, @Req() req) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });

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

      await this.userRepository.delete(id);
      return res.status(200).json({ statut: true, message: 'User deleted' });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }
}
