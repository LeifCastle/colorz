import ColorPicker from "@/components/ColorPicker";

export default function Home() {
  return (
    <main className="flex justify-center w-screen">
      <div
        id="layout"
        className="mr-VW5 w-layout_themeW h-layout_themeH bg-layoutBg"
      >
        <p className="text-center text-2xl mb-4">Layout</p>
        <button className="border-white border-2 pl-8 pr-8 mb-2 rounded-md">
          Header
        </button>{" "}
        <br />
        <button className="border-white border-2 pl-8 pr-8 rounded-md">
          Footer
        </button>
      </div>
      <div>
        <div
          id="scene"
          className="w-sceneW h-sceneH mt-10 border-white border-2 rounded-sm"
        ></div>
        <div className="flex justify-center">
          <div className="w-10 h-20 border-white border-2"></div>
        </div>
        <div className="flex justify-center">
          <hr className="w-40"></hr>
        </div>
        <div className="flex justify-center gap-40 mt-10">
          <button className="border-white border-2 pl-1 pr-1 rounded-md">
            Export Theme
          </button>
          <button className="border-white border-2 pl-1 pr-1 rounded-md">
            Save Theme
          </button>
        </div>
      </div>
      <div
        id="theme"
        className="ml-VW5 w-layout_themeW h-layout_themeH bg-layoutBg relative"
      >
        <ColorPicker />
      </div>
    </main>
  );
}
