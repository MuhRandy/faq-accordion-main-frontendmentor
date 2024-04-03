const sections = document.getElementsByTagName("section");
const buttons = document.getElementsByTagName("button");

let i = -1;

document.addEventListener("keydown", (event) => {
  i = navigateWithArrowKeyboard(buttons, event, i);

  buttons[i].focus();
});

// toggle to show or hide the content in accordion
for (const i in sections) {
  const section = sections[i];
  // its get error on console don't know why, but it work.
  const sectionParaghraphs = section.getElementsByTagName("p");
  const sectionButton = section.getElementsByTagName("button")[0];
  const horizontalLine = document.createElement("hr");

  const plusImage = createImgElement(
    "assets/images/icon-plus.svg",
    "plus icon"
  );
  const minusImage = createImgElement(
    "assets/images/icon-minus.svg",
    "minus icon",
    "hidden"
  );

  sectionButton.classList.add("sectionHeading");

  appendChilds(sectionButton, plusImage, minusImage);

  if (section !== sections[Number(sections.length - 1)]) {
    section.insertAdjacentElement("afterend", horizontalLine);
  }

  for (const j in sectionParaghraphs) {
    const sectionParaghraph = sectionParaghraphs[j];

    if (sectionParaghraph.classList !== undefined) {
      sectionParaghraph.classList.add("hidden");

      sectionButton.addEventListener("click", () => {
        addToggleHidden(sectionParaghraph, plusImage, minusImage);
      });
    }
  }
}

// Functions

function createImgElement(src, alt, ...classList) {
  const img = document.createElement("img");

  img.setAttribute("src", src);
  img.setAttribute("alt", alt);

  if (classList.length !== 0) {
    classList.forEach((token) => {
      img.classList.add(token);
    });
  }

  return img;
}

function addToggleHidden(...elements) {
  elements.forEach((element) => {
    element.classList.toggle("hidden");
  });
}

function appendChilds(parent, ...childs) {
  childs.forEach((child) => {
    parent.appendChild(child);
  });
}

function navigateWithArrowKeyboard(elements, event, i) {
  const lastElementIndex = elements.length - 1;

  switch (event.key) {
    case "ArrowDown":
      if (i === -1 || i === lastElementIndex) {
        return (i = 0);
      } else {
        return (i += 1);
      }

    case "ArrowUp":
      if (i === -1 || i === 0) {
        return (i = lastElementIndex);
      } else {
        return (i -= 1);
      }

    default:
      return i;
  }
}
