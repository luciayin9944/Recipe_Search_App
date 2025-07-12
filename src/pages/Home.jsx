
import styled from "styled-components";
import { Link } from "react-router-dom";


function Home() {
  return (
    <PageContainer>
      <Section>
        {/* left side*/}
        <CardContainer style={{ flex: 0.6 }}>
          <TextBox>
            <Title>Find delicious meals you can cook in minutes.</Title>
            <Description>
              Our quick recipe search helps you discover easy, tasty meals with minimal prep and cook time.
            </Description>
            <StartButton as={Link} to="/recipes">Start</StartButton>
          </TextBox>
        </CardContainer>

        {/* Right side */}
        <CardContainer $noPadding>
          <Image src="/about2.jpeg" alt="Quick recipe" />
        </CardContainer>
      </Section>
    </PageContainer>
  );
}

const PageContainer= styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  font-family: 'Helvetica Neue', sans-serif;
`;

const Section = styled.section`
  display: flex;
  width: 100%;
  max-width: 1600px;
  align-items: stretch;  
  gap: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CardContainer = styled.div`
  flex: 1;
  border: 0.5px solid transparent;
  border-radius: 12px;
  background-color:rgb(21, 52, 96);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  max-height: 700px;

  padding: ${(props) => (props.$noPadding ? "0" : "40px")};
  overflow: hidden;
`;


const TextBox = styled.div`
  max-width: 90%;
`;


const Title = styled.h2`
  font-size: 2.2rem;
  color:rgb(237, 237, 237);
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1rem;
  color:rgb(159, 161, 164);
  margin-bottom: 24px;
`;


const StartButton = styled.button`
  padding: 12px 28px;
  border-radius: 6px;
  background-color: rgb(207, 209, 212);
  color: rgb(21, 52, 96);
  border: none;
  cursor: pointer;
  margin-top: 24px;

  &:hover {
    background-color: rgb(73, 86, 94);
  }
`;


const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export default Home;