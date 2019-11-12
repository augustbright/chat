import PropType from "prop-types";

//Prop types
export default {
  Children: PropType.oneOfType([
    PropType.node,
    PropType.arrayOf(PropType.node)
  ]),
  SessionInfo: PropType.shape({
    nickname: PropType.string
  })
};
