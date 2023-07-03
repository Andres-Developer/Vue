const fetchClient = {
  clientName: "FetchClient",
  async get(url) {
    try {
      const response = await fetch(url);
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
        throw JSON.stringify({ code: response.status, message: response.statusText });
      }
    } catch (error) {
      throw new Error(error + ' in ' + this.clientName);
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
        throw JSON.stringify({ code: response.status, message: response.statusText });
      }
    } catch (error) {
      throw new Error(error + ' in ' + this.clientName);
    }
  },
  async delete(url) {
    const options = {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
    };

    try {
      const response = await fetch(url, options);
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