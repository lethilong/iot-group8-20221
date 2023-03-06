import pathname from "./config/pathname";
const nav = [
  {
    label: "home",
    to: `${pathname.home}`,
    color: "var(--purple)",
  },
  {
    label: "add",
    to: pathname.createHouse,
    color: "var(--yellow)",
  },
  {
    label: "person",
    to: pathname.profile,
    color: "var(--black)",
  },
];

export default nav;
