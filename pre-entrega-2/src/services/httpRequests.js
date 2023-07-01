import { fetchClient as client} from "./httpClients";

const getRequest = async (url) => {
  try {
    const data = await client.get(url);
    return data;
  } catch (error) {
    console.log("error with getRequest", error);
  }
};

export { getRequest };