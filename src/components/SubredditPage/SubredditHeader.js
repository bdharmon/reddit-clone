import React, { useEffect, useState } from 'react';
import './css/subredditHeader.css';

export const SubredditHeader = ({ thisSubReddit }) => {
    const [headerColor, setHeaderColor] = useState(null);

    const colors = ['4CCB6D','B76015','DAB765','1A4F1B','CA8D3A','F87C3D','9F4005','5E0156','670B62','63DF00','A091CC','F6C46D','ACBBD0','2483FF','562262','303C2F','92656D','319EC7','FEB71B','661897','BC8F9B','F2D584','2B5CA2','390E02','A79C02','4CFCB9','8AB5F4','A200EA','313404','6BB07B','3B8373','CFD75D','C00C1E','640A81','EEC9F3','52ED56','116F9C','C5CC2D','B82B2A','C199A8','C0BBE0','1028FB','4B1183','E3C1FF','BC045B','D2C8DB','9FBB7A','7B69CF','DB3AC2','98FAD4'];

    useEffect(() => {
        setHeaderColor("#" + colors[Math.floor(Math.random() * (colors.length + 1))]);
    }, [])

    return (
        <div className="sr-header">
            <div className="top-half-color" style={{backgroundColor: headerColor}}></div>

            <div className="sr-header-info">
                <i className="fas fa-film fa-4x"></i>
                <div className="sr-title">
                    <h3>{thisSubReddit.display_name}</h3>
                    <p>r/{thisSubReddit.display_name}</p>
                </div>
            </div>
        </div>
    );
};
