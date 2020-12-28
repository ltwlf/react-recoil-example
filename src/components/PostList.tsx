import * as React from 'react'
import { useRecoilValue } from 'recoil'
import { postListState } from '../stores'

export const PostList = () => {
    const posts = useRecoilValue(postListState)

    return (
        <ul>
        { posts.map(p => (<li key={p.id}>{p.title}</li>))}
        </ul>
    )
}