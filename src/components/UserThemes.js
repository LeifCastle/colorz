import { useRouter } from "next/navigation";

//Add are you sure box & yes/no button and change theme.name to be id
//  or no becuase you dont' want double named anyway?

export default function UserThemes({ themes, handleDeleteTheme }) {
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
        key={theme.name}
      >
        <div id={"interactive" + theme.name} hidden="hidden" className="h-full">
          <button className="bg-lhfBackgroundSelect w-full h-[32%] rounded-tl-md rounded-tr-md mb-4">
            Export Theme
          </button>
          <button
            className="bg-lhfBackgroundSelect w-full h-[32%] mb-4"
            onClick={() => handleUserTheme(theme)}
          >
            View/Edit Theme
          </button>
          <button
            className="bg-lhfBackgroundSelect text-[#EF1717] w-full h-[25%] rounded-bl-md rounded-br-md"
            onClick={() => handleDeleteTheme(theme.name)}
          >
            Delete Theme
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
