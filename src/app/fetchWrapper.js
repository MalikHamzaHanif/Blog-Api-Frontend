async function fetchWrapper(url, method, data, token) {
    try {

        let options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },

        }
        if (token) {
            options.headers.Authorization = token
        }
        if (data && (method !== "GET" && method !== "DELETE")) {
            options.body = JSON.stringify(data)
        }
        const res = await fetch(url, options);
        const resData = await res.json()
        if (!res.ok) {
            throw new Error(resData.data.msg || "Request failed")
        }
    
        return { success: true, data: resData };
    } catch (error) {
        return { success: false, message:error };
    }
}

export default fetchWrapper