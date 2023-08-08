# Colorz

Colorz is a dynamic theme builder that allows users to quickly create a layout of their website and choose a visually appealing color pallet based on that layout. Unlike most color pallet tools that only give users a bar or grid of chosen colors, Colorz gives users a direct visual representation of what their color scheme would look like on their website. This unique functionality mitiagtes and can even eliminate the tedious task of coping and pasting hex codes from a pallet you've designed to your website only to discover it doesn't look as good as you thought it would.

## Features

With a user-friendly interface, Colorz provides a canvas for creativity, enabling users to design themes with a variety of widgets such as headers, footers, boxes, and text boxes.

- **Exportable CSS Code**: Once you've designed your theme, you can export your background and text colors in CSS format.
- **Widget Naming**: _Hint: name your widgets with your websites variables in mind so you can plug your exported code in without editing variable names_
- **Theme Saving**: If you have an account, you can save themes you've designed for reference or editing later on.
- **Drag & Drop Interface**: Easily drag, drop, and move widgets within the bounds of the canvas.
- **Resizing**: Quickly resize boxes and text-boxes to get the size and text-placement you need.
- **Dynamic Properties Panel**: Adjust properties such as height, width, background color, font size, and font family for each widget.
  representation across devices.
- **Responsive Design (In Progress)**: The layout is designed to be responsive to your screen size, ensuring a seamless experience and accurate

# Install And Getting Started

Colorz is deployed with heroku at [colorznow.com](colorznow.com) but if you wan to install it on your local machine follow these steps to get Colorz up and running locally:

### Prerequisites

Ensure you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/en/) (v14 or above)
- [npm](https://www.npmjs.com/) (v6 or above)

### Installation and Setup

1. **Clone the repository**:

```bash
git clone https://github.com/LeifCastle/colorz.git
```

2. **Navigate to the project directory**:

```bash
cd colorz
```

3. **Install the required dependencies**:

```bash
npm install
```

Access the Application:
Open your preferred browser and navigate to http://localhost:3000 to start designing your theme!

# Future Implementations

**Theme Boost**:

- Allow users to create projects that have multiple "theme versions"
- Support theme duplication
- Additional theme export formats

**Widget & Property Boost**:

- Add more widgets such as drop-down menus, lines, images, etc...
- Advance Properties tools tab with working width/height, widget stack control (z-axis), rounding options, etc...
- Integrate a more advanced color picker tool with gradients and transparency.

**Device Responsiveness**:

- Enhance the UI/UX with media queries ensuring a seamless experience across all device sizes.

## Early design and ERD wireframes

![Design](https://i.gyazo.com/35eac007d10e37b25571ebb1ff94889b.png)
![ERD](https://i.gyazo.com/7e36d3a2a1174b7a55f4b337ac1cbe79.png)
