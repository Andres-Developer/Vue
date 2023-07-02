const fetchClient = {
  async get(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error with GET in fetchClient", error);
    }
  },
  async post(url, body) {

    const options = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error with POST in fetchClient", error);
    }
  }
};

export { fetchClient };