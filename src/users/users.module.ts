import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.entity';
import { LdapModule } from 'src/ldap/ldap.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    LdapModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
