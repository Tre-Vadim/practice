module.exports = (baseUrl) => (req, res) => {
  const parsedUrl = new URL(req.url, baseUrl);
  let params = {};
  parsedUrl.searchParams.forEach((value, key) => params[key] = value);
  req.pathname = parsedUrl.pathname;
  req.params = params;
};
