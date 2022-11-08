import React from 'react'

const Loading = () => {
    return (
        <div className='d-flex justify-content-center'>
            <div role='status' style={{width: '50px', height: '50px'}} className="spinner-border text-success">
                <span className='sr-only'>Loading...</span>
            </div>
        </div>
    )
}

export default Loading