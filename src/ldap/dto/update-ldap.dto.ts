import { PartialType } from '@nestjs/mapped-types';
import { CreateLdapDto } from './create-ldap.dto';

export class UpdateLdapDto extends PartialType(CreateLdapDto) {}
