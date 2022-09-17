import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { CreateLdapDto } from './dto/create-ldap.dto';
import { CreatePosixDto } from './dto/create-posix.dto';
import { CreateOrganizationalUnitDto } from './dto/create-organizational-unit.dto';
import { UpdateLdapPasswordDto } from './dto/update-ldap-password.dto';
import { UpdateLdapUidDto } from './dto/update-ldap-uid.dto';

const ldapUrl = 'http://34.70.80.18:6051/LDAP/';

@Injectable()
export class LdapService {
  constructor(private readonly httpService: HttpService) {}
  async createUser(createLdapDto: CreateLdapDto) {
    console.info('This action creates a new ldap user');
    return await firstValueFrom(
      this.httpService
        .post(ldapUrl + 'create/', createLdapDto)
        .pipe(map((response) => response.data)),
    );
  }
  async createPosixGroup(createPosixDto: CreatePosixDto) {
    console.info('This action creates a new posix group');
    return await firstValueFrom(
      this.httpService
        .post(ldapUrl + 'create/posix', createPosixDto)
        .pipe(map((response) => response.data)),
    );
  }
  async createOrganizationalUnit(
    createOrganizationalUnitDto: CreateOrganizationalUnitDto,
  ) {
    console.info('This action creates a new organizational unit');
    return await firstValueFrom(
      this.httpService
        .post(ldapUrl + 'create/orgunit', createOrganizationalUnitDto)
        .pipe(map((response) => response.data)),
    );
  }
  async updateUserPassword(updateLdapPasswordDto: UpdateLdapPasswordDto) {
    console.info('This action upates ldap password of user');
    return await firstValueFrom(
      this.httpService
        .post(ldapUrl + 'modify/password', updateLdapPasswordDto)
        .pipe(map((response) => response.data)),
    );
  }
  async updateUserUid(updateLdapUidDto: UpdateLdapUidDto) {
    console.info('This action updates ldap UID of user');
    console.log(updateLdapUidDto.fullName);
    console.log(updateLdapUidDto.ou);
    console.log(updateLdapUidDto.newUID);
    return await firstValueFrom(
      this.httpService
        .post(ldapUrl + 'modify/uid', updateLdapUidDto)
        .pipe(map((response) => response.data)),
    );
  }

  async findAnywhereInLdapByUid(username: string) {
    console.info('This action  finds a ldap user by username');
    return await firstValueFrom(
      this.httpService
        .get(`${ldapUrl}search/byuid/${username}`)
        .pipe(map((response) => response.data)),
    );
  }
  // removeUser(deleteLdapDto: DeleteLdapDto) {
  //   return this.httpService
  //     .delete(ldapUrl + 'delete' /*, deleteLdapDto*/)
  //     .pipe(map((response) => response.data));
  // }
}
