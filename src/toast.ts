export const toastMessage = (message: string, durationMs=3000) => {
  const div = document.getElementById("toast");
  div!.innerHTML = message;
  div!.className = "show";
  setTimeout(() => {
    div!.className = div!.className.replace("show", "");
  }, durationMs);
};
