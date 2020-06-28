export default class UserInfo {
  constructor({ nameUser, jobUser }) {
    this._name = nameUser;
    this._job = jobUser;
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    }
  }
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }

}
