import React from 'react'
import {Link} from 'react-router-dom'

const Pagination = ({pages, page, keyword}) => {
    return (
        pages && (
            <ul className='pagination justify-content-center'>
                {
                    
                    [...Array(pages).keys()].map((x) => (
                        <li key={x + 1} className={`page-item ${x + 1 === page ? "active" : ""}`}>
                            <Link className='page-link' 
                                to = { keyword ? `/search/${keyword}/page/${x+1}` 
                                    : `/page/${x+1}`
                                } 
                            > 
                                
                                {x+1} 
                                
                            </Link>
                        </li>
                    ))
                    
                }
            </ul>
        )
        
    )
}

export default Pagination