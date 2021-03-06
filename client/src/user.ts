import sha1 from 'sha1';
import { uniqueId } from '@seis/core';


export interface User {
  credentials: string,
  clientId: string,
}

export function getUser() {
  let creds = localStorage.getItem("creds")
  if (!creds) {
    creds = uniqueId()
    localStorage.setItem("creds", creds)
  }

  return {
    credentials: creds,
    clientId: sha1(creds),
  }
}
