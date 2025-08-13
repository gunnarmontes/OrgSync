import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

class AuthModel {
  /**
   * Register a new org account.
   * Body: { name, email, password }
   * Returns: { access, refresh, org } on success
   */
  async register({ name, email, password }) {
    const { data } = await api.post("/orgs/register/", { name, email, password });

    if (data?.access) localStorage.setItem(ACCESS_TOKEN, data.access);
    if (data?.refresh) localStorage.setItem(REFRESH_TOKEN, data.refresh);

    return {
      access: data?.access ?? null,
      refresh: data?.refresh ?? null,
      org: this.pickOrg(data),
    };
  }

  /**
   * Login with email/password.
   * Body: { email, password }
   * Returns: { access, refresh } on success
   */
  async login({ email, password }) {
    const { data } = await api.post("/orgs/login/", { email, password });

    if (data?.access) localStorage.setItem(ACCESS_TOKEN, data.access);
    if (data?.refresh) localStorage.setItem(REFRESH_TOKEN, data.refresh);

    return { access: data?.access ?? null, refresh: data?.refresh ?? null };
  }

  /**
   * Verify the current access token.
   * Returns: true if valid, false otherwise.
   */
  async verify() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) return false;

    try {
      await api.post("/orgs/token/verify/", { token });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Refresh the access token.
   * Returns: new access token or null if failed.
   */
  async refresh() {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    if (!refresh) return null;

    try {
      const { data } = await api.post("/orgs/token/refresh/", { refresh });
      if (data?.access) {
        localStorage.setItem(ACCESS_TOKEN, data.access);
        return data.access;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Fetch current org profile.
   */
  async me() {
    const { data } = await api.get("/orgs/me/");
    return data;
  }

  /**
   * Clear stored tokens.
   */
  logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  /**
   * Quick client-side auth check.
   */
  isAuthenticated() {
    return Boolean(localStorage.getItem(ACCESS_TOKEN) || localStorage.getItem(REFRESH_TOKEN));
  }

  /**
   * Private helper: pick org fields from register response.
   */
  pickOrg(data) {
    if (!data) return null;
    const { id, name, email, slug, created_at, updated_at } = data;
    if (id === undefined && name === undefined) return null;
    return { id, name, email, slug, created_at, updated_at };
  }
}

export default new AuthModel();
