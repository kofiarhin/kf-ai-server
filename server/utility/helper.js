const getRelevantChunk = (query, jsonData, maxResults = 3) => {
  const chunks = [];

  const walk = (obj, path = "") => {
    if (typeof obj === "string" || typeof obj === "number") {
      chunks.push({ text: String(obj), path });
    } else if (Array.isArray(obj)) {
      obj.forEach((item, i) => walk(item, `${path}[${i}]`));
    } else if (typeof obj === "object" && obj !== null) {
      Object.entries(obj).forEach(([key, value]) =>
        walk(value, path ? `${path}.${key}` : key)
      );
    }
  };

  walk(jsonData);

  const queryWords = query.toLowerCase().split(/\s+/);

  return chunks
    .map((chunk) => ({
      ...chunk,
      score: queryWords.reduce(
        (acc, word) => acc + (chunk.text.toLowerCase().includes(word) ? 1 : 0),
        0
      ),
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
};

module.exports = {
  getRelevantChunk,
};
