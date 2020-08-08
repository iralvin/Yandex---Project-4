export default class UserInfo {
  constructor({ profileName, profileProfession, profileAvatar }, nameInput, aboutMeInput) {
    this._profileName = document.querySelector(profileName);
    this._profileProfession = document.querySelector(profileProfession);
    this._profileAvatar = document.querySelector(profileAvatar);
    this._nameInput = nameInput;
    this._aboutMeInput = aboutMeInput;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      profession: this._profileProfession.textContent,
    };
  }

  setUserInfo(name, profession) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = profession;
  }

  setUserAvatar(avatar){
    this._profileAvatar.src = avatar;
  }

  setUserInputValues(){
    this._userInfo = this.getUserInfo();
    this._nameInput.value = this._userInfo.name;
    this._aboutMeInput.value = this._userInfo.profession;
  }
}
