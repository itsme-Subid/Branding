import video from "./smoke.mp4";
import "./App.css";
import Text from "./components/Text.js";
import Notification from "./components/Notification.js";
import { useState } from "react";
import platform from "platform";

function App() {
  const [name, setName] = useState("SUBID DAS");
  const [subtext, setSubtext] = useState("WEB DEVELOPER");
  const [submitClick, setSubmitClick] = useState(false);
  let notificationTitle = "Scroll Down to create your own";

  window.onload = async () => {
    let array = JSON.parse(localStorage.getItem("array"));
    if (array[array.length - 1].name !== null) {
      setName(array[array.length - 1].name);
      setSubtext(array[array.length - 1].subtext);
    }
    if (localStorage.getItem("oldUser") === null) {
      await ajax();
    }
  };
  async function ajax() {
    let form = document.querySelector("form");
    let method = "POST",
      url = "https://formspree.io/f/xqkjplwr",
      data = new FormData(form);
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Accept", "application/json");
    data.append("url", window.location.href);
    data.append("device_description", platform.description);
    let request = await fetch("https://ipinfo.io/json?token=b3f150d41b1bf2");
    let json = await request.json();
    data.append("ip_address", JSON.stringify(json));
    xhr.send(data);
    localStorage.setItem("oldUser", true);
  }
  let submit = async (event) => {
    event.preventDefault();
    let sname = document.querySelector("section input[name='name']").value;
    let ssubtext = document.querySelector(
      "section input[name='subtext']"
    ).value;
    setName(sname);
    setSubtext(ssubtext);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setTimeout(() => {
      document.querySelector("main video").play();
    }, 50);
    //constructor for form data
    function User() {
      this.name = sname;
      this.subtext = ssubtext;
    }
    if (localStorage.getItem("oldUser") === null) {
      await ajax();
      let array = [];
      array.push(new User());
      localStorage.setItem("array", JSON.stringify(array));
    } else {
      let array = JSON.parse(localStorage.getItem("array"));
      let j;
      for (j = 0; j < array.length; j++) {
        if (array[j].name === sname && array[j].subtext === ssubtext) {
          break;
        }
      }
      if (j === array.length) {
        await ajax();
        array.push(new User());
        localStorage.setItem("array", JSON.stringify(array));
      }
    }
    setSubmitClick(true);
  };
  return (
    <div>
      <Notification title={notificationTitle} />
      <div className="wrapper">
        <main className="onLoadSection">
          <video src={video} muted autoPlay={true}></video>
          <Text
            text={name}
            subtext={subtext}
            submitclick={submitClick}
            setsubmitclick={setSubmitClick}
          />
        </main>
      </div>
      <section>
        <form onSubmit={submit}>
          <h2>HELLO! Create Your Own</h2>
          <h3>By Entering Your Name and Designation</h3>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            id="name"
            pattern="[A-Za-z ]{3,}"
            title="Please enter at least 3 characters and only alphabets"
            required
          />
          <input
            type="text"
            name="subtext"
            placeholder="Enter Your Designation"
          />
          <input type="submit" />
        </form>
      </section>
    </div>
  );
}

export default App;
