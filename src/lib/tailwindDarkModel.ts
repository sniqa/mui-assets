const localStorage = window.localStorage;

const DARK_MODEL_KEY = "darkModel";

const DARK_MODEL = "dark";

const LIGHT_MODEL = "light";

localStorage.setItem(DARK_MODEL_KEY, DARK_MODEL);

export const toggleDarkModel = () => {
  const model = localStorage.getItem(DARK_MODEL_KEY);

  if (model === DARK_MODEL) {
    document.documentElement.classList.remove("dark");

    localStorage.setItem(DARK_MODEL_KEY, LIGHT_MODEL);
  } else {
    document.documentElement.classList.add("dark");

    localStorage.setItem(DARK_MODEL_KEY, DARK_MODEL);
  }
};
