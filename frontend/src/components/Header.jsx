import {  Badge,Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart  , FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/usersApiSlice'
import {logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from './SearchBox'
import finance from '../assets/finance.png'
import avatar from '../assets/avatar.png'
import s from '../assets/s.png'


const Header = () => {

  const { cartItems} = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logoutApiCall ] = useLogoutMutation();




  const logoutHandler = async () => {
    // dispatch(logout());

    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    }
    catch(err){
      console.log(err);
    }
  }

  console.log(cartItems);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
      <Container>
        <LinkContainer  to='/' >   
        <Navbar.Brand>
          <img src={s} alt="StellarCart" width="50px" height="50px"/>
          StellarCart
        </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox/>
            <LinkContainer to='/cart'>
            <Nav.Link>
            <img src={finance} alt="StellarCart" width="25px" height="25px"/> Bag
              { cartItems.length > 0 && (
                <Badge pill bg='success' style={{marginLeft : '5px'}}>
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </Badge>
                )
              }
              </Nav.Link>
            </LinkContainer>  
            {userInfo ? (
              <NavDropdown title={<span><img src={avatar} alt="User Icon" width="25px" height="25px" /> {userInfo.name}</span>} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link ><FaUser/> Sign In</Nav.Link>
              </LinkContainer>
            )}
            </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header