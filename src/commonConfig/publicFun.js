import Https from "@https/index";

export  function handleApiResult(params = {}) {
    return new Https({
        url: `${params.url}`,
        data: params.data || {},
        method: params.method || "get",
        isQuery: params.isQuery,  // 是否queryString
    }).getResults()
}