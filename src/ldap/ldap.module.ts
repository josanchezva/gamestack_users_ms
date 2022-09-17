import { Module } from '@nestjs/common';
import { LdapService } from './ldap.service';
import { LdapController } from './ldap.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [LdapController],
  providers: [LdapService],
  imports: [HttpModule],
  exports: [LdapService],
})
export class LdapModule {}
