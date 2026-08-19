import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Zoom from "react-reveal/Zoom";
import { Fade } from "react-reveal";
import { FaCode } from "react-icons/fa";
import projectsFallback from "../../data/projects.json";
import { resolveImage } from "../../data/imageMap";
import useContent from "../../hooks/useContent";

export default function Projects() {
  const projects = useContent("projects", projectsFallback);
  return (
    <div>
      <Container fluid className="certificate-section" id="about">
        <Container>
          <Row>
            <Col
              md={12}
              className="certificate-description d-flex justify-content-start"
            >
              <Zoom left cascade>
                <h1 className="aboutme-heading">Projects</h1>
              </Zoom>
            </Col>

            {projects.map((project) => (
              <Col md={3} key={project.id}>
                <Fade bottom>
                  <div
                    className="singleProject"
                    style={{
                      backgroundColor: "rgb(142 70 186 / 31%)",
                      border: "1px solid",
                    }}
                  >
                    <div className="projectContent">
                      <h5 style={{ color: "#fbd9ad" }}>{project.title}</h5>
                      <img src={resolveImage(project.image)} alt={project.title} />
                      <div className="project--showcaseBtn">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="iconBtn"
                          >
                            <FaCode className="icon" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p
                      className="project--desc"
                      style={{
                        background: "#fbd9ad",
                        color: "#b061df",
                        fontWeight: 600,
                      }}
                    >
                      {project.description}
                    </p>
                    <div className="project--lang">
                      {project.techStack.join(", ")}
                    </div>
                  </div>
                </Fade>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </div>
  );
}
