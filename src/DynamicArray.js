import React, { useRef, useEffect } from "react";
import { PositionContext } from "./index";
export function DynamicArray({
  boxes,
  isBlinking,

  setIsBlinking,

  collidedHashValue,
  searchedHashValue,
  deletedHashValue,
}) {
  const { leftPosition, setLeftPosition, setTopPosition, topPosition, k } =
    React.useContext(PositionContext);

  useEffect(() => {
    if (isBlinking) {
      const blinkTimer = setTimeout(() => {
        setIsBlinking(false);
      }, 1000); // Blink for 1 second
      return () => clearTimeout(blinkTimer);
    }
  }, [isBlinking]);
  // console.log(k);
  var deledArray = [];
  var searchedArray = [];
  var collidedArray = [];
  const insertedarray = boxes.map((item, i) => Number(item));
  collidedArray = collidedHashValue.map((item, i) => Number(item));
  deledArray = deletedHashValue.map((item, i) => Number(item));
  searchedArray = searchedHashValue.map((item, i) => Number(item));
  const secondElementRef = useRef(null);
  useEffect(() => {
    if (secondElementRef.current) {
      setLeftPosition(secondElementRef.current.getBoundingClientRect().left);
      setTopPosition(secondElementRef.current.getBoundingClientRect().top);
    }
  }, [k]);
  console.log(topPosition, leftPosition);
  // console.log(leftPosition);
  return (
    <div className="box-container">
      {boxes.map((value, index) => {
        let highlightcolor;
        var highlight = false;
        if (insertedarray[index] !== -1) {
          highlight = true;
        }
        const highlight1 = collidedArray.includes(index);
        // console.log(highlight1);
        const highlight2 = searchedArray.includes(index);
        const highlight3 = deledArray.includes(index);
        if (highlight2 && isBlinking) {
          highlightcolor = "aqua";
        } else if (highlight3 && isBlinking) {
          highlightcolor = "yellow";
        } else if (highlight1) {
          highlightcolor = "green";
        } else if (highlight) {
          highlightcolor = "red";
        } else {
          highlightcolor = "blue";
        }

        return (
          <div
            key={index}
            ref={index == k ? secondElementRef : null}
            id="box"
            style={{ backgroundColor: highlightcolor }}
          >
            <p className="nn">{value}</p>
            <p className="mm">{index}</p>
          </div>
        );
      })}
    </div>
  );
}
