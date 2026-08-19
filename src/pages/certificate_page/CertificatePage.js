import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import certificatesFallback from "../../data/certificates.json";
import { resolveImage } from "../../data/imageMap";
import useContent from "../../hooks/useContent";

export default function CertificatePage() {
  const certificates = useContent("certificates", certificatesFallback);
  return (
    <div className="mt-5">
      <Container>
        <Fade left cascade duration={1000} distance="20px">
          <Row className="g-5">
            {certificates.map((cert) => (
              <Col md={4} key={cert.id}>
                <div>
                  <img
                    src={resolveImage(cert.image)}
                    alt={cert.alt}
                    style={{ width: "100%", height: "100%" }}
                  />
                  <p className="text-center mt-2">{cert.caption}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Fade>
      </Container>
    </div>
  );
}
