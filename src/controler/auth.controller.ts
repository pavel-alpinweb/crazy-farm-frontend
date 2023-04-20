import User from "../model/user.model";

export default class AuthController {
  private $userModel ;
  constructor(userModel: User) {
      this.$userModel = userModel;
  }

  public init() {
      console.log('User Model:', this.$userModel.data);
  }
}
