const fetchClient = {
  async get(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error with fetchClient", error);
    }
  }

};

export { fetchClient };