import { Container , Row, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
const Footer = () => {
   const currentYear = new Date().getFullYear()
  return (
    <footer>
        <Container>
            <Row>
                <Col className="text-center py-3">
                    <p>StellarCart &copy; {currentYear} All Rights Reserved</p>
                </Col>
            </Row>
            <Row>
                <Col className="text-center py-3">
                    <Link to='/about'>About</Link>
                </Col>
            </Row>
        </Container>    
    </footer>
  )
}

export default Footer