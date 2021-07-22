import React from 'react';
import './css/sortPost.css';

export const SortPost = () => {
    return (
        <ul className="sort-post">
                <li className="sort-item"><i className="fas fa-rocket"></i><p>Best</p></li>
                <li className="sort-item"><i className="fas fa-fire"></i><p>Hot</p></li>
                <li className="sort-item"><i className="fas fa-certificate"></i><p>New</p></li>
                <li className="sort-item"><i className="fas fa-arrow-up"></i><p>Top</p></li>
                <li className="sort-item"><i className="fas fa-chart-line"></i><p>Rising</p></li>
                <li className="sort-item"><i className="fas fa-layer-group"></i><i className="fas fa-chevron-down"></i></li>
        </ul>
    );
};
