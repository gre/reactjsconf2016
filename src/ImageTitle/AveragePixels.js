const React = require("react");
const GL = require("gl-react");
const {Blur1D} = require("gl-react-blur");

module.exports = GL.createComponent(
  ({ children, quality }) =>
  <Blur1D pixelRatio={1} width={1} height={1} resolution={[ 1, 1 ]} direction={[ 0, 0.1 ]}>
    <Blur1D pixelRatio={1} width={1} height={quality} resolution={[ 1, quality ]} direction={[ 0.1, 0 ]}>
      {children}
    </Blur1D>
  </Blur1D>,
  {
    displayName: "AveragePixels",
    propTypes: {
      children: React.PropTypes.any.isRequired,
      quality: React.PropTypes.number.isRequired
    }
  });
