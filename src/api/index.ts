
const baseUrl = `https://jsonplaceholder.typicode.com`

export const  fetchPosts = async () => {
    const resp = await fetch(`${baseUrl}/posts`)
    return await resp.json()
}