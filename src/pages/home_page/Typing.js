import React from "react";
import Typewriter from "typewriter-effect";

function Typing() {
    return (
        <Typewriter
            options={{
                strings: [

                "Software Engineer",
                "AI/ML Developer",
                "Full Stack Developer",
                "Frontend Developer",
                "Backend Developer",
                "IT Specialist",
                "Data Scientist",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 30,
            }}
        />
    );
}

export default Typing;
