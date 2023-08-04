import { useState, useRef } from "react";

import { useRouter } from "next/navigation";

export default function userThemes({ themes }) {
  const router = useRouter();

  function handleUserTheme(theme) {
    localStorage.setItem("userTheme", JSON.stringify(theme));
    router.push("/");
  }

  function handleThemeInspect(theme) {
    let element = document.querySelector(`#interactive${theme}`);
    let name = document.querySelector(`#name${theme}`);
    name.setAttribute("hidden", "hidden");
    element.removeAttribute("hidden");
  }

  function handleThemeNoInspect(theme) {
    let element = document.querySelector(`#interactive${theme}`);
    let name = document.querySelector(`#name${theme}`);
    name.removeAttribute("hidden");
    element.setAttribute("hidden", "hidden");
  }

  let themeCollection = themes.map((theme) => {
    return (
      <div
        className="themeCard bg-pageHBg w-[150px] h-[150px] flex text-center items-center justify-center pb-4 rounded-md"
        onMouseOver={() => handleThemeInspect(theme.name)}
        onMouseOut={() => handleThemeNoInspect(theme.name)}
        display={false}
      >
        <div id={"interactive" + theme.name} hidden="hidden" className="h-full">
          <button className="bg-lhfBackgroundSelect w-full h-[50%] rounded-tl-md rounded-tr-md mb-4">
            Export Theme
          </button>
          <button
            className="bg-lhfBackgroundSelect w-full h-[50%] rounded-bl-md rounded-br-md"
            onClick={() => handleUserTheme(theme)}
          >
            View/Edit Theme
          </button>
        </div>
        <p id={"name" + theme.name} className="text-2xl">
          {theme.name}
        </p>
      </div>
    );
  });

  return <div className="flex gap-3">{themeCollection}</div>;
}
