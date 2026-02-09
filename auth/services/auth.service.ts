import { Injectable } from '@angular/core';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USERS_KEY = 'anyinvest:users';
  private readonly AUTH_KEY = 'anyinvest:auth_user';

  get currentUser(): StoredUser | null {
    const raw = sessionStorage.getItem(this.AUTH_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as StoredUser; } catch { return null; }
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  private readUsers(): StoredUser[] {
    const raw = sessionStorage.getItem(this.USERS_KEY);
    if (!raw) return [];
    try { return JSON.parse(raw) as StoredUser[]; } catch { return []; }
  }

  private writeUsers(users: StoredUser[]) {
    sessionStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  register(payload: { name: string; email: string; password: string }) {
    const email = payload.email.trim().toLowerCase();
    const users = this.readUsers();
    if (users.some(u => u.email.toLowerCase() === email)) {
      throw new Error('E-mail já cadastrado.');
    }

    const user: StoredUser = {
      id: crypto.randomUUID(),
      name: payload.name.trim(),
      email,
      password: payload.password,
    };

    users.push(user);
    this.writeUsers(users);
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
  }

  login(payload: { email: string; password: string }) {
    const email = payload.email.trim().toLowerCase();
    const users = this.readUsers();
    const found = users.find(u => u.email.toLowerCase() === email);

    if (!found || found.password !== payload.password) {
      throw new Error('E-mail ou senha inválidos.');
    }

    sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(found));
  }

  logout() {
    sessionStorage.removeItem(this.AUTH_KEY);
  }
}
