const GL = require("gl-react");
const React = require("react");
const AveragePixels = require("./AveragePixels");
const {BlurV} = require("gl-react-blur");
const TitleBlurMap = require("./TitleBlurMap");
const Title = require("./Title");

const shaders = GL.Shaders.create({
  ImageTitle: {
    frag: `
precision highp float;
varying vec2 uv;

uniform sampler2D img, imgBlurred, imgTone, title, blurMap;
uniform float colorThreshold;

float monochrome (vec3 c) {
  return 0.2125 * c.r + 0.7154 * c.g + 0.0721 * c.b;
}

void main () {
  float blurFactor = texture2D(blurMap, uv).r;
  vec4 bgColor = mix(
    texture2D(img, uv),
    texture2D(imgBlurred, uv),
    step(0.01, blurFactor)
  );
  vec4 textColor = vec4(vec3(
    step(monochrome(texture2D(imgTone, uv).rgb), colorThreshold)
  ), 1.0);
  float isText = 1.0 - texture2D(title, uv).r;
  gl_FragColor = mix(bgColor, textColor, isText);
}
    `
  }
});

module.exports = GL.createComponent(
({ width, height, children: img, text, colorThreshold }) => {
  // Render the title text (with react-canvas)
  const title = <Title width={width} height={height}>{text}</Title>;

  // Generate a blur map from the title text
  const blurMap = <TitleBlurMap threshold={0.7}>{title}</TitleBlurMap>;

  // Generate a 1x1 pixel image from average of pixels of the image
  const imgTone = <AveragePixels quality={8}>{img}</AveragePixels>;

  // Create a variable blur with blurMap
  const imgBlurred = <BlurV map={blurMap} factor={1.6} passes={4}>{img}</BlurV>;

  // Render the final shader mixing everything
  return <GL.Node
    width={width}
    height={height}
    shader={shaders.ImageTitle}
    uniforms={{ title, img, imgBlurred, imgTone, blurMap, colorThreshold }}
  />;
}, {
  displayName: "ImageTitle",
  defaultProps: {
    colorThreshold: 0.6
  },
  propTypes: {
    children: React.PropTypes.any.isRequired,
    text: React.PropTypes.string.isRequired,
    colorThreshold: React.PropTypes.number.isRequired
  }
});
