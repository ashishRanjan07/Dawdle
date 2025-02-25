import axios from "axios";
// export const serverAddress = `https://57ce-223-190-82-180.ngrok-free.app/dawdle/`;
export const serverAddress = `https://api-dev.assertit.io/dawdle/`;

export const CREATE_USER = async (data) => {
  const url = `${serverAddress}users/create`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};
export const CREATE_APPLE_USER = async (data) => {
  const url = `${serverAddress}users/create/apple`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const CREATE_TASK = async (data) => {
  const url = `${serverAddress}tasks/create`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const ADD_SUBTASK = async (data) => {
  const url = `${serverAddress}tasks/subtask`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const ADD_FEEDBACK = async (data) => {
  const url = `${serverAddress}users/feedback`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const ADD_RATING = async (data) => {
  const url = `${serverAddress}tasks/subtask/feedback`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const UPDATE_TIMER = async (data) => {
  const url = `${serverAddress}tasks/subtask/timer`;
  const response = await axios
    .put(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const GET_ALL_TASK = async (data) => {
  const url = `${serverAddress}tasks/${data}`;
  const response = await axios
    .get(url)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const MARK_TASK_COMPLETED = async (data) => {
  const url = `${serverAddress}tasks/mark/complete`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};
