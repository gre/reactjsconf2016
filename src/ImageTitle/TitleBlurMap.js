const React = require("react");
const GL = require("gl-react");
const {Blur} = require("gl-react-blur");

const shaders = GL.Shaders.create({
  TitleBlurMap: {
    frag: `
precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform float threshold;
void main () {
  gl_FragColor = vec4(
    vec3(smoothstep(1.0, threshold, texture2D(t, uv).r)),
    1.0);
}
    `
  }
});

module.exports = GL.createComponent(
({ children: title, threshold }) =>
<GL.Node
  shader={shaders.TitleBlurMap}
  uniforms={{ threshold }}
  width={64}
  height={64}
  preload>
  <GL.Uniform name="t">
    <Blur factor={4} passes={4} pixelRatio={1} width={200} height={200}>
      {title}
    </Blur>
  </GL.Uniform>
</GL.Node>, {
  displayName: "TitleBlurMap",
  propTypes: {
    children: React.PropTypes.any.isRequired,
    threshold: React.PropTypes.number
  }
});
