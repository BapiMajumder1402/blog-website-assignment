import React, { useMemo } from 'react';
import { Carousel } from 'react-bootstrap';

const Banner = () => {

    const bannerData = useMemo(() => [
        {
            image: 'https://static.vecteezy.com/system/resources/previews/000/381/988/original/vector-abstract-colorful-dotted-banner-background.jpg',
            title: 'Best Blog Website',
            description: 'Start from today',
        },
        {
            image: 'https://static.vecteezy.com/system/resources/previews/000/693/765/original/digital-connecting-banner-technology-polygon-background-vector.jpg',
            title: 'Join Us',
            description: 'Explore the world.',
        },
    ], []);

    return (
        <div className="banner-container">
            <Carousel>
                {bannerData.map((banner, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={banner.image}
                            alt={`${banner.title} slide`}
                        />
                        <Carousel.Caption>
                            <h3>{banner.title}</h3>
                            <p>{banner.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
