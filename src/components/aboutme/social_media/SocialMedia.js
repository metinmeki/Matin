import React from "react";
import {
  AiOutlineInstagram,
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineMail,
  AiFillYoutube,
} from "react-icons/ai";
import { Container, Row, Col } from "react-bootstrap";
import Zoom from "react-reveal/Zoom";
import socialLinksFallback from "../../../data/socialLinks.json";
import useContent from "../../../hooks/useContent";

const iconByPlatform = {
  instagram: AiOutlineInstagram,
  github: AiFillGithub,
  linkedin: AiFillLinkedin,
  youtube: AiFillYoutube,
  email: AiOutlineMail,
};

export default function SocialMedia() {
  const socialLinks = useContent("socialLinks", socialLinksFallback);
  return (
    <div className="mt-4">
      <Zoom left cascade>
        <h1>Connect with Me – Metin Meki</h1>
      </Zoom>
      <Container className="mt-5">
        <Row className="g-5">
          {socialLinks
            .filter((link) => link.enabled)
            .map((link) => {
              const Icon = iconByPlatform[link.platform];
              if (!Icon) return null;
              return (
                <Col md={2} key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <Zoom cascade>
                      <Icon />
                    </Zoom>
                  </a>
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}
