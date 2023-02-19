const paginatedResults = (data, page, limit) => {
  const p = parseInt(page ? page : 1);
  const l = parseInt(limit ? limit : 5);
  const startIndex = (p - 1) * l;
  const endIndex = p * l;
  const results = {};
  if (endIndex < data.length) {
    results.next = {
      page: p + 1,
      limit: l,
    };
  }
  if (startIndex > 0) {
    results.previous = {
      page: p - 1,
      limit: l,
    };
  }
  results.result = data.splice(startIndex, endIndex);
  //   console.log(results);
  return results;
};

module.exports = { paginatedResults };
