import { useState } from "react";
import { ArrowRightCircle, ArrowLeftCircle } from "react-feather";
import styled, { css } from "styled-components";
import Spinner from "./Spinner";
import useSWR from "swr";

function ImageSlider({ url }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: images, error, isLoading } = useSWR(url, fetchImages);

  async function fetchImages(currentURL) {
    const response = await fetch(currentURL);
    const data = await response.json();

    if (data) {
      const editedData = data.map((image) => {
        return {
          id: image.id,
          url: image.urls.full,
          alt: image.alt_description,
          slug: image.slug,
        };
      });
      return editedData;
    }
  }

  function handleNextImg() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }
  function handlePrevImg() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Wrapper>
      <LeftArrow onClick={handlePrevImg} />
      {images?.map(({ id, alt, url }, index) => (
        <CurrentImg key={id} alt={alt} src={url} show={currentSlide === index ? 1 : 0} />
      ))}
      <RightArrow onClick={handleNextImg} />
      <IndicatorWrapper>
        {images?.map((_, index) => (
          <Indicator
            key={index}
            onClick={() => setCurrentSlide(index)}
            active={currentSlide === index ? 1 : 0}
          ></Indicator>
        ))}
      </IndicatorWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 450px;
`;

const CurrentImg = styled.img`
  display: ${({ show }) => !show && "none"};
  border-radius: 0.5rem;
  box-shadow: 0px 0px 7px #666;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const baseArrowStyles = css`
  position: absolute;
  width: 2rem;
  height: 2rem;
  color: #fff;
  filter: drop-shadow(0px 0px 5px #555);
  cursor: pointer;
  transition: transform 100ms cubic-bezier(0.55, 0.055, 0.675, 0.19);

  &:hover {
    transform: scale(1.4);
  }
`;

const LeftArrow = styled(ArrowLeftCircle)`
  ${baseArrowStyles}
  left: 1rem;
`;
const RightArrow = styled(ArrowRightCircle)`
  ${baseArrowStyles}
  right: 1rem;
`;

const IndicatorWrapper = styled.span`
  display: flex;
  position: absolute;
  bottom: 1rem;
`;

const Indicator = styled.button`
  background-color: ${({ active }) => (active ? "#ffffff" : "gray")};
  width: 15px;
  height: 15px;
  border-radius: 50%;
  outline: none;
  margin: 0 0.2rem;
  cursor: pointer;
  transition: transform 100ms cubic-bezier(0.55, 0.055, 0.675, 0.19);

  &:hover {
    transform: scale(1.2);
  }
`;

export default ImageSlider;
