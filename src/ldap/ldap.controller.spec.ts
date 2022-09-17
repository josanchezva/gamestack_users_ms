import { Test, TestingModule } from '@nestjs/testing';
import { LdapController } from './ldap.controller';
import { LdapService } from './ldap.service';

describe('LdapController', () => {
  let controller: LdapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LdapController],
      providers: [LdapService],
    }).compile();

    controller = module.get<LdapController>(LdapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
