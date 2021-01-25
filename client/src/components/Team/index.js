import React from "react";
import { Link } from "react-router-dom";
import { TeamStyle } from "./style";
import { developers } from "./data.json";
import github from "../../media/icons/github.svg";
import linkedin from "../../media/icons/linkedin.svg";
import whatsapp from "../../media/icons/whatsapp.svg";
import gmail from "../../media/icons/gmail.svg";
import musicalNote from "../../media/icons/musical-notes.svg";

const Index = () => {
  return (
    <TeamStyle>
      <div className="container">
        {developers.map((dev) => {
          return (
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={dev.photoUrl} alt="Avatar" />
                  <h4>{dev.givenName}</h4>
                  <h5>Full Stack Developer</h5>
                </div>
                <div className="flip-card-back">
                  <div className="inside">
                    <h4>
                      {dev.givenName} {dev.familyName}
                    </h4>
                    <div className="contact">
                      <a
                        href={`mailto:/${dev.email}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={gmail} alt="gmail" />
                      </a>
                      <a href={dev.github} target="_blank" rel="noreferrer">
                        <img src={github} alt="github" />
                      </a>
                      <a href={dev.linkedin} target="_blank" rel="noreferrer">
                        <img src={linkedin} alt="linkedin" />
                      </a>
                      <a
                        href={`https://wa.me/${dev.phone}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={whatsapp} alt="whatsapp" />
                      </a>
                      <h5>{dev.city}</h5>{" "}
                      {/* idea Lis del mapa de google maps */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={musicalNote} alt="Avatar" />
              <h4 className="Joi">Join Us !</h4>
            </div>
            <div className="flip-card-back">
              <Link to={`/contact`}>
                <button>Join</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </TeamStyle>
  );
};

export default Index;