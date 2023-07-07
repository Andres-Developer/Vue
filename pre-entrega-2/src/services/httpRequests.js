import { axiosClient as client } from "./httpClients";
// import { fetchClient as client } from "./httpClients";

const getRequest = async (url) => {
  try {
    const { data } = await client.get(url);
    return data;
  } catch (error) {
    console.error("Error in GET Request: \n", error);
  }
};

const postRequest = async (url, body) => {
  try {
    const { data } = await client.post(url, body);
    return data;
  } catch (error) {
    console.error("Error in POST Request: \n", error);
  }
};

const putRequest = async (url, body) => {
  try {
    const { data } = await client.put(url, body);
    return data;
  } catch (error) {
    console.error("Error in PUT Request: \n", error);
  }
};

const deleteRequest = async (url) => {
  try {
    const { data } = await client.delete(url);
    return data;
  } catch (error) {
    console.error("Error in DELETE Request: \n", error);
  }
};


export { getRequest, postRequest, putRequest, deleteRequest };