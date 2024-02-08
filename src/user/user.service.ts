import { Body, Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { generateToken } from 'src/utils/Token';
import { comparePassword, hashPassword } from 'src/utils/hash';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity'; // Assurez-vous que le chemin est correct
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      res.cookie('user', generateToken(user), { httpOnly: true });
      res.status(200).json({
        statut: true,
        message: { ...user, token: generateToken(user) },
      });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }
}
