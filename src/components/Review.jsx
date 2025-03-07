import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../components/style.css"


import user1 from "../assets/user-1.jpg";
import user2 from "../assets/user-2.jpg";
import user3 from "../assets/user-3.jpg";

const Review = () => {
  const testimonials = [
    {
      img: user1,
      text: "Furni.shop transformed my living space with their beautiful and affordable furniture. The 5% cashback was a delightful bonus!",
      name: "David Miller",
      role: "Real Estate Agent",
    },
    {
      img: user2,
      text: "Exceptional quality and service! The furniture is stunning, and the 30-day payment terms made it incredibly convenient.",
      name: "Sarah Thompson",
      role: "Interior Designer",
    },
    {
      img: user3,
      text: "The 30-day terms made it easy for us to furnish our new home without financial stress. Highly recommended!",
      name: "Michael Lee",
      role: "Entrepreneur",
    },
  ];

  return (
    <section className="section__container client__container">
      <div className="client__content">
        <h2 className="section__header">What our happy clients say</h2>
        <p className="section__description">
          Testimonials Highlighting Our Commitment to Quality, Exceptional
          Service, and Customer Satisfaction.
        </p>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="client__card">
                <img src={testimonial.img} alt="user" />
                <div>
                  <p>{testimonial.text}</p>
                  <h4>{testimonial.name}</h4>
                  <h5>{testimonial.role}</h5>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Review;

