async function importAllQueries() {
  const queryModules = import.meta.glob("../queries/*.js");
  const queryRegex = /^\s*{(.*)}\s*$/s;

  return `{${
    (await Promise.all(
      Object.values(queryModules).map(async (load) =>
        queryRegex.exec((await load()).default)?.[1]?.trim() || ""
      )
    )).join("\n")
  }}`;
}

const fullQuery = await importAllQueries();

async function fetchData() {
  try {
    const config = useRuntimeConfig().public;
    const url = process.env.NUXT_DB_URL || config.NUXT_DB_URL;
    const token = process.env.NUXT_ACCESS_TOKEN || config.NUXT_ACCESS_TOKEN;

    return await $fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: fullQuery }),
    });
  } catch (error) {
    console.error("Failed to fetch data from CMS:", error);
    return null;
  }
}

const CMS = {
  async get(contentType) {
    const { data } = await fetchData();
    const format = (data) =>
      Array.isArray(data)
        ? data.map(({ attributes }) => attributes)
        : data?.attributes || data;

    const content = data?.[contentType === "all" ? data : contentType]?.data;

    return contentType === "all"
      ? Object.fromEntries(
          Object.entries(data).map(([key, { data }]) => [key, format(data)])
        )
      : format(content);
  },
};

export default CMS;
