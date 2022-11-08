import React from 'react'
import Header from '../components/Header'
import ShoppingSection from '../components/Home/ShoppingSection'
import ContactInfo from '../components/Home/ContactInfo'
import CallToAction from '../components/Home/CallToAction'
import Footer from '../components/Footer'

const HomeScreen = () => {
    return (
        <>
            <Header />  
            <ShoppingSection />
            <CallToAction />
            <ContactInfo />
            <Footer />
        </>
    )
}

export default HomeScreen