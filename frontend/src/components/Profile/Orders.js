import React from 'react'
//import { Link } from 'react-router-dom'

const Orders = () => {
  return (
    <div className='d-flex justify-content-center align-center flex-column'>
        {/* <div className="col-12 alert alert-info text-center mt-3">
            <Link style={{fontSize: '12px'}} className='btn btn-success mx-2 px-3 py-2' to={`/`}>
                <p>START SHOPPING</p>
            </Link>
        </div> */}

        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="alert-success">
                        <td>
                            <a href="/" className='link'> 1 </a>
                        </td>
                        <td>Paid</td>
                        <td>Oct. 7 2022</td>
                        <td>$ 234</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Orders