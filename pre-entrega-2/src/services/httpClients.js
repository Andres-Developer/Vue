const BASE_URL = process.env.VUE_APP_BASE_URL;

const fetchClient = {
  clientName: "FetchClient",
  async get(endpoint) {
    try {
      const response = await fetch(BASE_URL + endpoint);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw JSON.stringify({ code: response.status, message: response.statusText });
      }
    } catch (error) {
      throw new Error(error + ' in ' + this.clientName);
    }
  },
  async post(endpoint, body) {
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
      const response = await fetch(BASE_URL + endpoint, options);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw JSON.stringify({ code: response.status, message: response.statusText });
      }
    } catch (error) {
      throw new Error(error + ' in ' + this.clientName);
    }
  },
  async put(endpoint, body) {
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
      const response = await fetch(BASE_URL + endpoint, options);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw JSON.stringify({ code: response.status, message: response.statusText });
      }
    } catch (error) {
      throw new Error(error + ' in ' + this.clientName);
    }
  },
  async delete(endpoint) {
    const options = {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
    };

    try {
      const response = await fetch(BASE_URL + endpoint, options);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw JSON.stringify({ code: response.status, message: response.statusText });
      }
    } catch (error) {
      throw new Error(error + ' in ' + this.clientName);
    }
  }
};



export { fetchClient };