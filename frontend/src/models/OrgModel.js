import api from "../api";

const OrgModel= {
  getMe() {
    return api.get("/orgs/me/").then(r => r.data);
  }
};

export default OrgModel;
