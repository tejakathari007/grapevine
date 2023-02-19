let cache = {};
const getCacheData = () => cache;
const setCacheDate = (data) => {
  cache = data;
};

module.exports = { getCacheData, setCacheDate };
