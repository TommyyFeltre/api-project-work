import { User as UserModel } from "./user.model";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";
import { User } from "./user.entity";
import { UserExistsError } from "../../errors/user-exists";
import * as bcrypt from 'bcrypt';
import { assign } from "lodash";
import { NotFoundError } from "../../errors/not-found";

export class UserService {

  async add(user: User, credentials: {username: string, password: string}): Promise<User> {
    const existingIdentity = await UserIdentityModel.findOne({'credentials.username': credentials.username});
    if (existingIdentity) {
      throw new UserExistsError();
    }
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    const newUser = await UserModel.create(user);

    await UserIdentityModel.create({
      provider: 'local',
      user: newUser._id,
      credentials: {
        username: credentials.username,
        hashedPassword
      }
    })

    return newUser;
  }
  

  async changePassword(credentials: {username: string, password: string}){
    const item = await this.getById(credentials.username);
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    if(!item){
      throw new NotFoundError();
  }
  assign(item, hashedPassword);
  await item.save();
  return this.getById(credentials.username) as Promise<User>;
  }

  private async getById(id: string){

    return UserModel.findOne({_id: id}).populate("createdBy assignedTo");
}

}

export default new UserService();