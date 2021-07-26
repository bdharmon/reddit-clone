import React, { useEffect } from 'react'
import './css/postSection.css';
import { CreatePost } from './CreatePost'
import { Post } from './Post'
import { SortPost } from './SortPost'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../../redux/actions/allPosts';

export const PostSection = () => {
    const { items, loading } = useSelector(state => state.allPostsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div className="post-section">
            <CreatePost />
            <SortPost />
            {loading ? "Loading..." : items.map(item => <Post key={item.id} item={item} />)}
        </div>
    );
};
