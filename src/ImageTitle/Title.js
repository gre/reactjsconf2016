const React = require("react");
const { Surface, Text, Group, FontFace } = require("react-canvas");

class Title extends React.Component {
  render () {
    const { children, width, height } = this.props;
    const containerStyle = {
      backgroundColor: "#fff",
      flexDirection: "column",
      alignItems: "center",
      width,
      height
    };
    const textStyle = {
      top: 10,
      left: 0,
      width,
      height,
      fontFace: FontFace("Didot, Georgia, serif", null, { weight: 800 }),
      fontSize: 78,
      lineHeight: 84,
      color: "#000",
      fontWeight: "bold",
      textAlign: "center"
    };
    return (
      <Surface width={width} height={height} top={0} left={0}>
        <Group style={containerStyle}>
          <Text style={textStyle}>{children}</Text>
        </Group>
      </Surface>
    );
  }
}

Title.propTypes = {
  children: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};

module.exports = Title;
