import React from 'react';
import Link from 'next/link';


export default () => (
    <div className="d-flex justify-content-center text-secondary">
        <Link href="/search">Choose</Link>&nbsp;or&nbsp;<Link href="/new">create</Link>&nbsp;a room to start chatting
    </div>
);