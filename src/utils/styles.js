export const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: "#060e29",
    color: "#86a6bb",
    // match with the menu
    borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
    // Overwrittes the different states of border
    borderColor: "##86a6bb",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
     borderColor: state.isFocused ? "#70bbec" : "#86a6bb",
     cursor: "pointer",
    }
  }),
  menu: base => ({
    ...base,
    background: "#060e29",
    color: "#86a6bb",
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
    cursor: "pointer",
  }),
  menuList: base => ({
    ...base,
    background: "#060e29",
    color: "#86a6bb",
    // kill the white space on first and last option
    padding: 0,
    cursor: "pointer",
  }),
  singleValue: base => ({
    ...base,
    background: "#060e29",
    color: "#70bbec",
    // kill the white space on first and last option
    padding: 0
  })
};
