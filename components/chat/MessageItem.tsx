import React from 'react';

export default ({message}) => {
    return (
        <div className="d-flex mb-3">
            <div className="mr-1 text-primary font-weight-bold">
                {message.author.nickname}:
            </div>
            <div className="">
                {message.content}
            </div>
        </div>
    );
};