export const selectCustomStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: "#ebebeb",
    boxShadow: state.isFocused ? "none" : provided.boxShadow,
    "&:hover": {
      borderColor: "#ebebeb",
    },
    height: "calc(1.5em + 0.75rem + 2px)",
    color: "#495057",
    fontSize: "0.8rem",
    fontFamily: "IBM Plex Sans",
    fontWeight: "500",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#6c757d",
    fontSize: "0.8rem",
    fontFamily: "IBM Plex Sans",
    fontWeight: "500",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#495057",
    fontSize: "0.8rem",
    fontFamily: "IBM Plex Sans",
    fontWeight: "500",
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
};
