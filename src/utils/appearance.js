import store from "@/store";

export function changeView(view) {
  store.commit("setShowView", view);
}
export function changeTheme() {
  const newTheme = store.state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  store.commit("setTheme", newTheme);
}
export function getTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  store.commit("setTheme", currentTheme);
}
export function hiddenBody(state) {
  let ListToggle = "";
  if (state) {
    ListToggle += "overflow-hidden w-screen h-screen";
    if (window.innerWidth < 810) {
      ListToggle += " 1md:overflow-auto 1md:w-auto 1md:h-auto";
    }
  }
  document.body.className = ListToggle;
}
