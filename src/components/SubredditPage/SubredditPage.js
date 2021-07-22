import React, { useState, useEffect } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { CreateNewPost } from '../CreateNewPost/CreateNewPost';
import './css/subredditPage.css';
import { Post } from '../Main/PostSection/Post';
import { MainPost } from './PostSection/MainPost';
import { RightSection } from './RightSection/RightSection';
import { SubredditHeader } from './SubredditHeader';
import { Fragment } from 'react';

export const SubredditPage = () => {
    const { subreddit } = useParams();
    const [posts, setPosts] = useState([])
    const [thisSubReddit, setThisSubReddit] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { url } = useRouteMatch();

    useEffect(() => {
        try {
            fetch(`http://127.0.0.1:8000/redditclone/r/${subreddit}/`)
                .then(response => response.json())
                .then(data => {
                    setThisSubReddit(data);
                    setLoading(false);
                });
        } catch (error) {
            console.error(error);
            return;
        }
    }, [subreddit])

    useEffect(() => {
        try {
            fetch(`http://127.0.0.1:8000/redditclone/?subreddit__name=${subreddit}`)
                .then(response => response.json())
                .then(data => {
                    setPosts(data);
                });
        } catch (error) {
            console.error(error);
            return;
        }
    }, [subreddit])


    return (
        <div className="subreddit-page">
            {isLoading ? "Loading..." : (<Fragment><SubredditHeader thisSubReddit={thisSubReddit} />
                <div className="sr-body">
                    <Switch>

                        <Route exact path={`${url}`}>
                            <div className="sr-posts-list">
                                {posts.length < 1 ? "No post(s) to display." : posts.map(item => <Post key={item.id} item={item} />)}
                            </div>
                        </Route>

                        <Route exact path={`${url}/post/:postid`}>
                            <MainPost subreddit={subreddit} />
                        </Route>

                        <Route exact path={`${url}/submit`}>
                            <CreateNewPost thisSubReddit={thisSubReddit} />
                        </Route>

                    </Switch>
                    <RightSection thisSubReddit={thisSubReddit} />
                </div>
            </Fragment>)}
        </div>
    );
};
