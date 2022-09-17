import React from "react";

function Text(props) {
  let innerWidth = window.innerWidth;
  let startTime = innerWidth > 768 ? 0.9 : 1.25;
  let i = 0;
  let text = props.text;
  setTimeout(function () {
    let h1Span = document.querySelectorAll(".nameAnimation");
    let h2 = document.querySelector("h2");
    h1Span.forEach((span) => {
      span.classList.remove("nameAnimation");
      span.classList.add("opacity-1");
    });
    h2.classList.remove("subtextAnimation");
  }, 6500);
  if (props.submitclick) {
    let h1Span = document.querySelectorAll(".opacity-1");
    let h2 = document.querySelector("h2");
    h1Span.forEach((span) => {
      span.classList.remove("opacity-1");
      span.classList.add("nameAnimation");
    });
    h2.classList.add("subtextAnimation");
    setTimeout(() => {
      props.setsubmitclick(false);
    }, 50);
  }
  return (
    <>
      <h1>
        {Array.from(text).map((letter) =>
          letter === " " ? (
            <span
              className="nameAnimation"
              key={`${i++}`}
              style={{
                animationDelay: `${
                  i * ((0.2 * (text.length + 2)) / 12) + startTime
                }s`,
              }}
            >
              &nbsp;
            </span>
          ) : (
            <span
              className="nameAnimation"
              key={`${i++}`}
              style={{
                animationDelay: `${
                  i * ((0.2 * (text.length + 2)) / 12) + startTime
                }s`,
              }}
            >
              {letter}
            </span>
          )
        )}
      </h1>
      <h2 className="subtextAnimation">{props.subtext}</h2>
    </>
  );
}

export default Text;
