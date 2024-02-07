import React from 'react'

export default function RecipeScanner() {
  return (
    <>
  <title>Fruit Identifier</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\n        .heading {\n  text-align: center;\n}\n\n#webcam-container {\n  display: flex;\n  /* display: none; */\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 10px;\n}\n\n#label-container {\n  text-align: center;\n}\n\nbody {\n  background: #ffecd9;\n  display: grid;\n  height: 100vh;\n  margin: 0;\n  place-items: center;\n  padding: 1rem;\n  font-family: \'Ubuntu\', sans-serif;\n  background-color: black;\n  color: white;\n  background-image: url("/img/bg.jpg");\n  background-color: #cccccc;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  position: relative;\n}\n\nbutton {\n  -webkit-appearance: none;\n  background: webkit-gradient(to right, #a2ccb6 0%, #fceeb5 50%, #ee786e 100%);\n  background: linear-gradient(to right, #a2ccb6 0%, #fceeb5 50%, #ee786e 100%);\n  background-size: 500%;\n  border: none;\n  border-radius: 5rem;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  color: #fff;\n  cursor: pointer;\n  font: 1.5em Raleway, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  height: 5rem;\n  letter-spacing: 0.05em;\n  outline: none;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  width: 20rem;\n}\n\nbutton:hover {\n  animation-name: gradient;\n  -webkit-animation-name: gradient;\n  animation-duration: 2s;\n  -webkit-animation-duration: s;\n  animation-iteration-count: 1;\n  -webkit-animation-iteration-count: 1;\n  animation-fill-mode: forwards;\n  -webkit-animation-fill-mode: forwards;\n}\n\n@keyframes gradient {\n  0% {\n    background-position: 0% 50%;\n  }\n  100% {\n    background-position: 100%;\n  }\n}\n\n\n/* Text */\n.content {\n  background-color: rgba(0, 0, 0, 0.5);\n  height: 70px;\n  overflow: hidden;\n  font-family: "Lato", sans-serif;\n  font-size: 35px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: #ecf0f1;\n  position: relative;\n}\n\n.content__container {\n  font-weight: 600;\n  overflow: hidden;\n  height: 40px;\n  padding: 0 40px;\n  position: relative;\n}\n\n.content__container:before {\n  content: "[";\n  position: absolute;\n  color: lightpink;\n  top: 0;\n  left: 0;\n}\n\n.content__container:after {\n  content: "]";\n  position: absolute;\n  top: 0;\n  color: lightpink;\n  right: 0;\n}\n\n.content__container__text {\n  display: inline;\n  float: left;\n  margin: 0;\n}\n\n.content__container__list {\n  margin-top: 0;\n  padding-left: 110px;\n  text-align: left;\n  list-style: none;\n  animation-name: change;\n  animation-duration: 10s;\n  animation-iteration-count: infinite;\n}\n\n.content__container__list__item {\n  line-height: 40px;\n  margin: 0;\n  color: lightblue;\n}\n\n@keyframes change {\n  0%, 12.66%, 100% {\n    transform: translate3d(0, 0, 0);\n  }\n  16.66%, 29.32% {\n    transform: translate3d(0, -25%, 0);\n  }\n  33.32%, 45.98% {\n    transform: translate3d(0, -50%, 0);\n  }\n  49.98%, 62.64% {\n    transform: translate3d(0, -75%, 0);\n  }\n  66.64%, 79.3% {\n    transform: translate3d(0, -50%, 0);\n  }\n  83.3%, 95.96% {\n    transform: translate3d(0, -25%, 0);\n  }\n}\n\n    '
    }}
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
  <div className="content">
    <div className="content__container">
      <p className="content__container__text">Let's</p>
      <ul className="content__container__list">
        <li className="content__container__list__item">scan !</li>
        <li className="content__container__list__item">uplaod !</li>
        <li className="content__container__list__item">identify !</li>
        <li className="content__container__list__item">eat !</li>
      </ul>
    </div>
  </div>
  <div id="upload-container">
    <button
      type="button"
      id="upload-image-button"
      onclick="startImageIdentification()"
    >
      Upload Image
    </button>
    <input
      id="image-upload"
      type="file"
      accept="image/*"
      onchange="uploadImage(event)"
      style={{ display: "none" }}
    />
  </div>
  <div id="live-camera-container">
    <button type="button" onclick="startLiveCamera()">
      Use Live Camera
    </button>
    <div id="webcam-container" />
  </div>
  <div id="label-container" />
</>

  )
}
