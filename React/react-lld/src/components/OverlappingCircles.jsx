import { useState, useEffect } from "react";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const elementsOverlap = (rect1, rect2) => {
  const collide = !(
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top
  );
  return collide;
};

const OverlappingCircles = () => {
  const [elementsCoordinate, setElementsCoordinate] = useState([]);
  const draw = (e) => {
    const { clientX, clientY } = e;
    setElementsCoordinate((prev) => {
      const currentState = {
        top: clientY - 100,
        left: clientX - 100,
        right: clientX - 100 + 200,
        bottom: clientY - 100 + 200,
        background: "red",
      };

      for (let i = 0; i < prev.length; i++) {
        if (elementsOverlap(currentState, prev)) {
          currentState.background = getRandomColor();
          break;
        }
      }
      return [...prev, currentState];
    });
  };

  useEffect(() => {
    document.addEventListener("click", draw);
    return () => {
      document.removeEventListener("click", draw);
    };
  }, []);

  // eslint-disable-next-line react/prop-types
  const Circle = ({top, left, background}) => {
    return (<div
    style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        opacity: '0.5',
        background,
        top,
        left
    }}
    ></div>)
  }

  return (
    <div>
        {
            elementsCoordinate?.map((e) => (
                <Circle {...e} key={e.top + e.left + e.right + e.bottom}/>
            ))
        }
    </div>
  )
};

export default OverlappingCircles