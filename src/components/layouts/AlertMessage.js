import React from 'react'

export default function AlertMessages(props) {
    let { className, message } = props;

    return (
        <div className={className}>
            {message}
        </div>
    );
};
