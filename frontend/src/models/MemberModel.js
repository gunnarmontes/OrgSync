import api from "../api";

/**
 * Returns a list of members for the current org.
 * Backend route assumed: GET /orgs/members/
 * Shape example: [{ id, name, email, phone, created_at }]
 */
const MemberModel = {
  list() {
    return api.get("/orgs/members/").then((r) => r.data);
  },
};

export default MemberModel;
