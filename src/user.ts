import sha1 from 'sha1';
import { token16 } from './token';


export interface User {
  credentials: string,
  clientId: string,
}

export function getUser() {
  let creds = localStorage.getItem("creds")
  if (!creds) {
    creds = token16(16);
    localStorage.setItem("creds", creds)
  }

  return {
    credentials: creds,
    clientId: sha1(creds),
  }
}
