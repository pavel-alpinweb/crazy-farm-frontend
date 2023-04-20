export default class AuthController {
  private $userModel = null;
  constructor({ userModel }: any) {
      this.$userModel = userModel;
  }

  public init() {
      console.log('User Model:', this.$userModel);
  }
}
