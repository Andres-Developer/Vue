const loadingWithTimeout = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, timeout);
  });
};

export { loadingWithTimeout };