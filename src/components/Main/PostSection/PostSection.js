import React, { useEffect, useState } from 'react'
import './css/postSection.css';
import { CreatePost } from './CreatePost'
import { Post } from './Post'
import { SortPost } from './SortPost'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../../redux/actions/allPosts';

export const PostSection = () => {
    const [sortOption, setSortOption] = useState("-date_created");
    const [voteOrder, setVoteOrder] = useState([])
    const { items, loading } = useSelector(state => state.allPostsReducer);
    const dispatch = useDispatch();

    const sortHandler = (sort) => {
        setSortOption(sort);
    };


    const sortByMostUpvotes = () => {
        fetch("http://127.0.0.1:8000/redditclone/mostupvotes/")
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    console.log(item);
                });
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        dispatch(fetchPosts(sortOption));
    }, [dispatch, sortOption]);

    return (
        <div className="post-section">
            <CreatePost />
            <SortPost sortHandler={sortHandler} sortByMostUpvotes={sortByMostUpvotes} />
            {loading ? "Loading..." : items.map(item => <Post key={item.id} item={item} />)}
        </div>
    );
};
