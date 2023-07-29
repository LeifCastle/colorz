import { useState } from "react";

import { useRouter } from "next/navigation";

export default function userThemes({ themes }) {
  const [buttons, setButtons] = useState();
  const router = useRouter();

  function handleUserTheme(theme) {
    localStorage.setItem("userTheme", JSON.stringify(theme));
    router.push("/");
  }

  function handleThemeInspect(theme) {
    let buttonOptions = (
      <div className="h-full">
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
    );
    setButtons(buttonOptions);
  }

  function handleThemeNoInspect(theme) {
    setButtons(<p className="text-2xl">{theme.name}</p>);
  }

  let themeCollection = themes.map((theme) => {
    let name;
    if (!buttons) {
      name = <p className="text-2xl">{theme.name}</p>;
    }
    if (!buttons) {
    }
    return (
      <div
        id={theme.name}
        className="bg-pageHBg w-[150px] h-[150px] flex text-center items-center justify-center pb-4 rounded-md"
        onMouseOver={() => handleThemeInspect(theme)}
        onMouseOut={() => handleThemeNoInspect(theme)}
      >
        {name}
        {buttons}
      </div>
    );
  });

  return <div className="flex gap-3">{themeCollection}</div>;
}
