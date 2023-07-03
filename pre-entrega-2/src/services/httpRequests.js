import { fetchClient as client } from "./httpClients";

const getRequest = async (url) => {
  try {
    const data = await client.get(url);
    return data;
  } catch (error) {
    console.error("Error with getRequest: \n", error);
  }
};

const postRequest = async (url, body) => {
  try {
    const data = await client.post(url, body);
    return data;
  } catch (error) {
    console.error("Error with postRequest: \n", error);
  }
};

export { getRequest, postRequest };