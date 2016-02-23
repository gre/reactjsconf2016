const React = require("react");
const {
  Component
} = React;
const ReactDOM = require("react-dom");
const GlReactInspector = require("gl-react-inspector");
const { Surface } = require("gl-react-dom");
const ImageTitle = require("./ImageTitle");

const video = "/assets/video.mp4";

const images = [
  "/assets/2.jpg",
  "/assets/5.jpg",
  "/assets/1.jpg",
  "/assets/6.jpg",
  "/assets/3.jpg",
  "/assets/4.jpg",
  "/assets/7.jpg"
];

const initialTitle =
`Hello
San Francisco
☻`;

class Demo extends Component {

  constructor (props) {
    super(props);
    this.state = {
      glCanvas: null,
      title: initialTitle,
      colorThreshold: 0.6,
      toggleMode: false,
      imageIndex: 0,
      videoMode: false
    };
  }

  componentDidMount () {
    window.addEventListener("resize", () => this.forceUpdate());
    window.addEventListener("keyup", this.onKeyup);
  }

  onKeyup = e => {
    switch (e.keyCode) {
    case 27: // ESC
      e.preventDefault();
      this.setState({
        toggleMode: !this.state.toggleMode
      });
      break;

    case 37:
      if (e.altKey) { // alt+left
        e.preventDefault();
        this.onPrev();
      }
      break;

    case 39:
      if (e.altKey) { // alt+right
        e.preventDefault();
        this.onNext();
      }
      break;

    case 86:
      if (e.altKey) { // alt+v
        e.preventDefault();
        this.onVideoMode();
      }
      break;
    }
  };

  onVideoMode = () => {
    this.setState({
      videoMode: !this.state.videoMode
    });
  };

  onPrev = () => {
    this.setState({
      imageIndex: (this.state.imageIndex - 1 + images.length) % images.length
    });
  };

  onNext = () => {
    this.setState({
      imageIndex: (this.state.imageIndex + 1) % images.length
    });
  };

  onRef = ref => {
    const glCanvas = ref && ref.getGLCanvas();
    if (glCanvas !== this.state.glCanvas) {
      this.setState({ glCanvas });
    }
  };

  render () {
    const { glCanvas, title, toggleMode, imageIndex, videoMode, colorThreshold } = this.state;
    const width = 600;
    const height = 400;

    return (
      <div>
        <div hidden={toggleMode}>


<Surface ref={this.onRef} width={width} height={height} preload opaque={false} autoRedraw={videoMode}>

  <ImageTitle text={title} colorThreshold={colorThreshold}>
    { videoMode ?
      <video autoPlay loop>
        <source type="video/mp4" src={video} />
      </video>
     : images[imageIndex]
    }
  </ImageTitle>

</Surface>


          <div className="controls">
            <textarea
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
            />
            <p>
              <label>color threshold</label>
              <br/>
              <strong>black</strong>
              <input
                value={colorThreshold}
                onChange={e => this.setState({ colorThreshold: parseFloat(e.target.value, 10) })}
                type="range"
                min={0}
                max={1}
                step={0.01}
              />
              <strong>white</strong>
            </p>
            <p>
              <button onClick={this.onPrev}>←</button>
              <span> image </span>
              <button onClick={this.onNext}>→</button>
            </p>
            <p>
              <button onClick={this.onVideoMode}>toggle video</button>
            </p>
            <p><em>(press ESC to switch to Inspector)</em></p>
          </div>
        </div>

        <div hidden={!toggleMode} style={{ height: window.innerHeight }}>
        { glCanvas && <GlReactInspector.Inspector glCanvas={glCanvas} /> || null }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("demo"));
