import React from 'react'
import Header from '../components/Header'
import ShoppingSection from '../components/Home/ShoppingSection'
import ContactInfo from '../components/Home/ContactInfo'
import CallToAction from '../components/Home/CallToAction'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {
    const params = useParams()
    const keyword = params.keyword
    const pageNumber = params.pageNumber
    return (
        <>
            <Header />  
            <ShoppingSection keyword ={keyword} pageNumber={pageNumber} />
            <CallToAction />
            <ContactInfo />
            <Footer />
        </>
    )
}

export default HomeScreen