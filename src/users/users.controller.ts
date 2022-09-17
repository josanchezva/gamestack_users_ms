import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LdapService } from 'src/ldap/ldap.service';
import { UpdateUserPasswordDto } from './dto/update-user-password-dto';
import { UpdateUserEmailDto } from './dto/update-user-email-dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ldapService: LdapService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.usersService.create(createUserDto);
    console.info(response);
    const ldapdto = {
      firstName: response['username'],
      lastName: response['username'],
      ou: 'users',
      gid: 500,
      uid: response['email'],
      password: response['password'],
    };
    console.info(ldapdto);
    await this.ldapService.createUser(ldapdto);
    return response;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Get('getByEmail/:email')
  async findByEmail(@Param('email') email: string) {
    const ldapSearch = await this.ldapService.findAnywhereInLdapByUid(email);
    console.info(ldapSearch);
    if (ldapSearch > 0) {
      console.info('ldapSearch > 0');
      return this.usersService.findByEmail(email);
    } else {
      return;
    }
  }
  @Get('getByRole/:role')
  findOneByRole(@Param('role') role: string) {
    return this.usersService.findByRole(role);
  }
  @Get('getByUsername/:username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
  @Get('validateEmailUsername/:email/:username')
  async validateUser(
    @Param('email') email: string,
    @Param('username') username: string,
  ) {
    const ldapSearch = await this.ldapService.findAnywhereInLdapByUid(email);
    if (ldapSearch > 0) {
      return false;
    } else {
      return this.usersService.validateUserSignUp(email, username);
    }
  }
  @Get('validateSession/:email/:password')
  async validateUserEmailAndPassword(
    @Param('email') email: string,
    @Param('password') password: string,
  ) {
    const ldapSearch = await this.ldapService.findAnywhereInLdapByUid(email);
    if (ldapSearch > 0) {
      return this.usersService.validateUserEmailAndPassword(email, password);
    } else {
      return false;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }
  @Patch('/patch/password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const updateLdapPasswordDto = {
      fullName: `${updateUserPasswordDto.fullname} ${updateUserPasswordDto.fullname}`,
      ou: `${updateUserPasswordDto.ou}`,
      oldPassword: `${updateUserPasswordDto.oldPassword}`,
      newPassword: `${updateUserPasswordDto.newPassword}`,
    };

    await this.ldapService.updateUserPassword(updateLdapPasswordDto);
    return await this.usersService.updatePassword(id, updateUserPasswordDto);
  }
  @Patch('/patch/email/:id')
  async updateEmail(
    @Param('id') id: string,
    @Body() updateUserEmailDto: UpdateUserEmailDto,
  ) {
    const updateLdapEmailDto = {
      fullName: `${updateUserEmailDto['userName']} ${updateUserEmailDto['userName']}`,
      ou: updateUserEmailDto['ou'],
      newUID: updateUserEmailDto['newUID'],
    };
    //TODO: update ldap email
    //console.info(await this.ldapService.updateUserUid(updateLdapEmailDto));
    return await this.usersService.updateEmail(id, updateUserEmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
