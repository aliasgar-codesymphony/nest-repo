import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, pass: string) {
    const user = await this.userService.getUserByEmail(email);
    console.log(user);
    if (user != null) {
      const isMatch = await bcrypt.compare(pass, user?.password);
      console.log(isMatch);
      if (isMatch == true) {
        const payload = { sub: user.id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException();
      }
    }
  }

  /* const { password, ...result } = user;
    return result; */
}
