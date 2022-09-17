import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LdapService } from './ldap.service';
import { CreateLdapDto } from './dto/create-ldap.dto';

@Controller('ldap')
export class LdapController {
  constructor(private readonly ldapService: LdapService) {}

  @Post('user')
  createUser(@Body() createLdapDto: CreateLdapDto) {
    return this.ldapService.createUser(createLdapDto);
  }

  @Get('getUserAnywhereInLdapByUid/:email')
  findOneUserBy(@Param('email') email: string) {
    return this.ldapService.findAnywhereInLdapByUid(email);
  }
}
