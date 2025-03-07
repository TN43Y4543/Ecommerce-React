import React from 'react'

const Deal = () => {
  return (
    <div>
         <section className="section__container deals__container">
      <div className="deals__card">
        <h2 className="section__header">Hot 🔥 deals for you</h2>
        <p>Online shopping for retail sales direct to consumers</p>
      </div>
      <div className="deals__card">
        <span><i className="ri-cash-line"></i></span>
        <h4>1.5% cashback</h4>
        <p>Earn a 5% cashback reward on every  purchase you make!</p>
      </div>
      <div className="deals__card">
        <span><i className="ri-calendar-schedule-line"></i></span>
        <h4>30 day terms</h4>
        <p>
          Take advantage of our 30-day payment terms, completely interest-free!
        </p>
      </div>
      <div className="deals__card">
        <span><i className="ri-money-rupee-circle-line"></i></span>
        <h4>Save money</h4>
        <p>
          Discover unbeatable prices and save big money on top-quality
          Dresses!
        </p>
      </div>
    </section>
      
    </div>
  )
}

export default Deal
