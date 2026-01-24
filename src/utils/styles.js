export const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: "rgba(30, 41, 59, 0.6)",
    color: "#f0f9ff",
    borderRadius: state.isFocused ? "10px 10px 0 0" : "10px",
    borderColor: state.isFocused ? "#34d399" : "#475569",
    borderWidth: "2px",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(52, 211, 153, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
    fontSize: "0.65em",
    padding: "3px",
    "&:hover": {
      borderColor: state.isFocused ? "#34d399" : "#64748b",
      cursor: "pointer",
    }
  }),
  menu: base => ({
    ...base,
    background: "rgba(30, 41, 59, 0.95)",
    color: "#f0f9ff",
    borderRadius: "0 0 10px 10px",
    marginTop: 0,
    cursor: "pointer",
    border: "2px solid #34d399",
    borderTop: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    overflow: "hidden",
  }),
  menuList: base => ({
    ...base,
    background: "transparent",
    color: "#f0f9ff",
    padding: 0,
    cursor: "pointer",
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? "rgba(52, 211, 153, 0.25)" : "transparent",
    color: state.isSelected ? "#34d399" : "#f0f9ff",
    cursor: "pointer",
    fontSize: "0.75em",
    padding: "8px 12px",
    transition: "background 0.2s ease",
    "&:hover": {
      background: "rgba(52, 211, 153, 0.3)",
    }
  }),
  singleValue: base => ({
    ...base,
    background: "transparent",
    color: "#34d399",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    padding: 0,
    fontWeight: 700,
  }),
  placeholder: base => ({
    ...base,
    color: "#94a3b8",
  }),
  indicatorSeparator: base => ({
    ...base,
    display: "none",
  }),
  dropdownIndicator: base => ({
    ...base,
    color: "#34d399",
    "&:hover": {
      color: "#6ee7b7",
    }
  })
};
