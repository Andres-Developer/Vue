const fetchClient = {
  async get(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(JSON.stringify({ code: response.status, message: response.statusText }));
      }
    } catch (error) {
      console.error("Error with GET in fetchClient: \n", error);
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
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(JSON.stringify({ code: response.status, message: response.statusText }));
      }
    } catch (error) {
      console.log("Error with POST in fetchClient: \n", error);
    }
  },
  async put(url, body) {
    const options = {
      method: "PUT",
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
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(JSON.stringify({ code: response.status, message: response.statusText }));
      }
    } catch (error) {
      console.log("Error with PUT in fetchClient: \n", error);
    }
  }
};

export { fetchClient };