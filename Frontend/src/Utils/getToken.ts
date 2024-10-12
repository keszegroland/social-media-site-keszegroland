import { JWTTokenType } from "../Types";

function getToken(): JWTTokenType {
  const token: JWTTokenType = localStorage.getItem('jwt');

  if (token === null) {
    throw new Error('JWT token not found in LocalStorage.');
  }
  return token;
}

export default getToken;