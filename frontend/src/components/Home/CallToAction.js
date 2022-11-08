import React from 'react'

const CallToAction = () => {
    return (
        <div className='subscribe-section bg-with-black'>
            <div className='container'>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="subscribe-head">
                            <h2>Do you need more tips?</h2>
                            <p>Sign up free and get the latest tips.</p>
                            <div>
                                <form className='form-section'>
                                    <input name='email' placeholder='Your Email...' type="email" />
                                    <input name='subscribe' type="submit" value='Yes I want !' />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallToAction