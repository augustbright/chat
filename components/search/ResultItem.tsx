import React from 'react';

export default ({exploreResult}) => {
    return (
        <div className="card bg-light">
            <div className="card-body">
                <div className="card-title">{exploreResult.name}</div>
            </div>
        </div>
    );
};