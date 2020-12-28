import { IComment, IPost } from "../types"

const baseUrl = `https://jsonplaceholder.typicode.com`

export const fetchPosts = async () => {
    const resp = await fetch(`${baseUrl}/posts`)
    return await resp.json() as IPost[]
}

export const fetchComments = async (postId: number) => {
    const resp = await fetch(`${baseUrl}/posts/${postId}/comments`)
    return await resp.json() as IComment[]
}