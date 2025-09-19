import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";

const About = () => {
  return (
    <div>
      <Container>
        <Row className="mt-5">
          <Col md={5}>
            <Slide left>
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_iv4dsx3q.json"
                background="transparent"
                speed="1"
                style={{ width: "100%", height: "90%" }}
                loop
                autoplay
              ></lottie-player>
            </Slide>
          </Col>

          <Col md={7}>
            <Fade duration={3000}>
              <p className="home-about-body">
                Hi ! I am <b className="purple">Metin Meki</b>, an <b className="purple">AI & Web Developer, IT Specialist, Data Scientist, and Kaggle Expert</b>. 
                <br />
                <br />
                I am proficient in programming languages such as &nbsp;
                <b className="purple">C#, PHP, Python, HTML, CSS, and JavaScript</b>.
                <br />
                <br />
                I also have experience with frameworks and libraries like &nbsp;
                <b className="purple">ReactJS, NodeJS, Pandas, NumPy, and OpenCV</b>.
                <br />
                <br />
                I enjoy learning new technologies and &nbsp;
                <b className="purple">building innovative web applications and AI solutions.</b>
              </p>
            </Fade>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
