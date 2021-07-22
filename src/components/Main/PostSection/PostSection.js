import React, { useEffect, useState } from 'react'
import './css/postSection.css';
import { CreatePost } from './CreatePost'
import { Post } from './Post'
import { SortPost } from './SortPost'

export const PostSection = () => {
    const [allPosts, setAllPosts] = useState(null);

    useEffect(() => {
        try {
            fetch("http://127.0.0.1:8000/redditclone/")
                .then(response => response.json())
                .then(data => setAllPosts(data));
        } catch (error) {
            console.error(error);
            return;
        }
    }, []);

    return (
        <div className="post-section">
            <CreatePost />
            <SortPost />
            {allPosts ? allPosts.map(item => <Post key={item.id} item={item} />) : "Loading..."}
        </div>
    );
};
