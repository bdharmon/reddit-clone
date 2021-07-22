import React from 'react';
import './css/topCommunities.css';

export const TopCommunities = () => {
    return (
        <ul className="top-comm">
            <li className="top-comm-item">
                <div className="tc-header">
                    <img src="" alt="" />
                    <p>Top Communities</p>
                </div>
            </li>

            <li className="top-comm-item">
                <ul className="subreddit-rank">
                    <li>
                        <p>1</p>
                        <i className="fas fa-chevron-up"></i>
                        <i className="fab fa-nutritionix fa-2x"></i>
                        <p>r/reddit</p>
                    </li>
                </ul>
            </li>

            <li className="top-comm-item">
                <ul className="subreddit-rank">
                    <li>
                        <p>1</p>
                        <i className="fas fa-chevron-up"></i>
                        <i className="fab fa-nutritionix fa-2x"></i>
                        <p>r/reddit</p>
                    </li>
                </ul>
            </li>

            <li className="top-comm-item">
                <ul className="subreddit-rank">
                    <li>
                        <p>1</p>
                        <i className="fas fa-chevron-up"></i>
                        <i className="fab fa-nutritionix fa-2x"></i>
                        <p>r/reddit</p>
                    </li>
                </ul>
            </li>

            <li className="view-all-btn top-comm-item"><button>View All</button></li>


            <li className="top-comm-item">
                <div className="tc-footer">
                    <ul>
                        <li><p>Top</p></li>
                        <li><p>Near You</p></li>
                        <li><p>News</p></li>
                        <li><p>Gaming</p></li>
                    </ul>
                </div>
            </li>
        </ul>
    );
};
