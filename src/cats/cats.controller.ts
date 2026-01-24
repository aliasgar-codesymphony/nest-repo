import {
  Controller,
  Get,
  HostParam,
  HttpCode,
  HttpStatus,
  Ip,
  Redirect,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  @HttpCode(200)
  findAll(@Req() request: Request, @Ip() ip: string): string {
    return `This returns all cats, Amount: ${request.query.amount} , Your ip: ${ip}`;
  }

  @Get('red')
  @Redirect('https://amazon.in')
  redirectDemo() {
    return 'Redirect Demo';
  }

  @Get('async')
  async asyncDemo(): Promise<any[]> {
    return [
      {
        id: 1,
        name: 'Amit',
      },
    ];
  }
}
