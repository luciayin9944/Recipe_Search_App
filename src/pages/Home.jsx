import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


function Home() {
  return (
    <PageWrapper>
      <Section>
        {/* left side*/}
        <CardContainer>
          <TextBox>
            <Title>Find delicious meals you can cook in minutes.</Title>
            <Description>
              Our quick recipe search helps you discover easy, tasty meals with minimal prep and cook time.
            </Description>
            <StartButton as={Link} to="/recipes">Start</StartButton>
          </TextBox>
        </CardContainer>

        {/* Right side */}
        <CardContainer noPadding>
          <Image src="/about.jpg" alt="Quick recipe" />
        </CardContainer>
      </Section>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 20px;
`;

const Section = styled.section`
  display: flex;
  width: 100%;
  max-width: 1200px;
  align-items: stretch;  
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


const CardContainer = styled.div`
  flex: 1;
  border: 0.5px solid #ccc;
  border-radius: 12px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${(props) => (props.noPadding ? "0" : "40px")};
  overflow: hidden;
`;

const TextBox = styled.div`
  max-width: 90%;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  color:rgb(21, 52, 96);
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

const StartButton = styled.button`
  margin-top: 200px;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color:rgb(21, 52, 96);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:rgb(73, 86, 94);
  }
`;


const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;



export default Home;