import { Link } from 'react-router-dom'

import { Row, Col, Card} from 'react-bootstrap'

const AboutScreen = () => {
  return (
    <>

        
    <div className="container">
        <h1 className="text-center">About</h1>
        <p className="text-center">Stellar Cart is an e-commerce website that allows you to buy products online. You can buy products from various categories like electronics, clothing, etc. You can also sell your products on Stellar Cart. </p>
        <h1 className="text-center">Portfolio</h1>
        <Row>
           
              <Col sm={12} md={6} lg={4} xl={3}>
                <Card className='my-3 p-3 rounded'>
                    <Card.Img src="https://avatars.githubusercontent.com/u/69633098?v=4" variant="top"/>
                    <Card.Body>
                        <Card.Title as="div" className='product-title'>
                        <Link to='https://www.linkedin.com/in/swaraj-sonwane/'><strong>LinkdIn</strong></Link>
                        </Card.Title>
                     </Card.Body>
                </Card>
                
              </Col>
              <Col sm={12} md={6} lg={4} xl={3}>
                <Card className='my-3 p-3 rounded'>
                    <Card.Img src="https://avatars.githubusercontent.com/u/69633098?v=4" variant="top"/>
                    <Card.Body>
                        <Card.Title as="div" className='product-title'>
                        <Link to='https://github.com/swarajsonwane'><strong>Github</strong></Link>
                        </Card.Title>
                        
                    </Card.Body>
                </Card>
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                <Card className='my-3 p-3 rounded'>
                    <Card.Img src="https://avatars.githubusercontent.com/u/69633098?v=4" variant="top"/>
                    <Card.Body>
                        <Card.Title as="div" className='product-title'>
                            <Link to='https://leetcode.com/imSwaraj/'><strong>Leetcode</strong></Link>
                        </Card.Title>
                    </Card.Body>
                </Card>
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                <Card className='my-3 p-3 rounded'>
                    <Card.Img src="https://avatars.githubusercontent.com/u/69633098?v=4" variant="top"/>
                    <Card.Body>
                        <Card.Title as="div" className='product-title'>
                            <Link to='https://drive.google.com/drive/folders/1zquPNY3MrSmoqRbdjTz5ccda9AOocKSs'><strong>Certificates</strong></Link>
                        </Card.Title>
                    </Card.Body>
                </Card>
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                <Card className='my-3 p-3 rounded'>
                    <Card.Img src="https://avatars.githubusercontent.com/u/69633098?v=4" variant="top"/>
                    <Card.Body>
                        <Card.Title as="div" className='product-title'>
                            <Link to='https://drive.google.com/file/d/1h0SxF0QhnbK-wKOsZDT36inruSAUqA_e/view?usp=sharing'><strong>Resume</strong></Link>
                        </Card.Title>
                    </Card.Body>
                </Card>
                </Col>

          </Row>

    </div>
    


    <Link className='btn btn-light my-3' to='/'>
            Go Back
     </Link>
    </>
    
    
            
  )
}

export default AboutScreen