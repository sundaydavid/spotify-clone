import { baseUrl } from "./config";

export const makeUnauthenticatedPostRequest = async (route, body) => {
  const response = await fetch(baseUrl + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const formattedResponse = await response.json();
  return formattedResponse;
};

export const makeAuthenticatedPostRequest = async (route, body) => {
  const token = getToken();
  const response = await fetch(baseUrl + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const formattedResponse = await response.json();
  return formattedResponse;
};

export const makeAuthenticatedGetRequest = async (route) => {
  const token = getToken();
  const response = await fetch(baseUrl + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const formattedResponse = await response.json();
  return formattedResponse;
};

const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\$*)token\$*=\$*([^;]*).*$)|^.*$/,
    "$1"
  );
  return accessToken;
};
