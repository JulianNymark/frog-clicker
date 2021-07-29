export const toastMessage = (message: string) => {
  const div = document.getElementById("toast");
  div.innerHTML = message;
  div.className = "show";
  setTimeout(() => {
    div.className = div.className.replace("show", "");
  }, 3000);
};
