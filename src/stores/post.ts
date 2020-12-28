import { atom } from "recoil";
import { fetchPosts } from "../api";

export interface IPost {
    id: number
    userId: number
    title: string,
    body: string
}

export const postListState = atom<IPost[]>({
    key: 'postListState', 
    default: fetchPosts()
  });
