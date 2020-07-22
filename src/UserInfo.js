export default class UserInfo {
  constructor({ profileName, profileProfession }) {
    this._profileName = document.querySelector(profileName);
    this._profileProfession = document.querySelector(profileProfession);
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
}
