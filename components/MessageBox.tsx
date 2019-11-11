import React from 'react';
import {useSelector} from 'react-redux';
import {selectMessageList} from '../redux/selectors';
import MessageItem from './MessageItem';


export default () => {
    const messageList = useSelector(selectMessageList);
    return (
        <>
            {messageList.map(message => (
                <MessageItem key={message._id} message={message}/>
            ))}
        </>        
    );
};