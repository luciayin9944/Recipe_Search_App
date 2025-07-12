
import { Link } from "react-router-dom";
import styled from "styled-components";


function NavBar() {
  return (
    <Navbar>
      <NavbarContent>
        <Logo>QuickCook</Logo>
        <NavButtons>
          <NavLink to="/">About</NavLink>
          <NavLink to="/recipes">RecipeSearch</NavLink>
        </NavButtons>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;

// styled-components
const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  z-index: 999;
`;



const NavbarContent = styled.div`
  max-width: 1200px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;  
`;

const NavButtons = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  right: 20px;
`;


const Logo = styled.div`
  font-family: "Permanent Marker", cursive;  
  font-size: 20px;
  font-weight: bold;
  color: #255b80;
  margin-right: auto;
  left: 40px;
`;

const NavLink = styled(Link)`
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  text-decoration: underline;
  color: #255b80;

  &:hover {
    color: #8b8c8d;
  }
`;







