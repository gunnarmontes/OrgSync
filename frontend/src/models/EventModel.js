// src/models/EventApi.js
import api from "../api";

const EventModel = {
  list(scope = "planned") {
    return api.get("/orgs/events/", { params: { scope } }).then(r => r.data);
  },
  create({ description, date, time, location }) {
    return api.post("/orgs/events/", { description, date, time, location })
              .then(r => r.data)
  },
};

export default EventModel;
