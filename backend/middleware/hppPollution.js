// HPP Whitelist
const hppWhitelist = ['name', 'area', 'city'];

// Middleware für die HPP-Prüfung
export const avoidQueryParams = async (req, _, next) => {
  // HPP verhindern
  Object.keys(req.query).forEach((key) => {
    if (!hppWhitelist.includes(key)) {
      delete req.query[key];
    }
  });
  next();
};
