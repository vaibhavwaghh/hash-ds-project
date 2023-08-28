import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import "./Boxcontainer.css";
import { Div } from "./Div.js";
import { DynamicArray } from "./DynamicArray.js";
export const PositionContext = createContext();

function MainComponent() {
  const [hashingFunctionName, sethashingFunctionName] = useState(false);
  const [collisionResolution, setCollisionResolution] = useState(false);
  const [key, setKey] = useState("");
  const [key1, setKey1] = useState("");
  const [key2, setKey2] = useState("");
  const [numBoxes, setNumBoxes] = useState(false);
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState(false);
  const [boxes1, setMyBoxes1] = useState([]);
  const [explain, setExplain] = useState(false);
  const [boxes, setMyBoxes] = useState([]);
  const [insertedElement, setInsertedElement] = useState([]);
  const [searchedElement, setSearchedElement] = useState([]);
  const [deletedElement, setDeletedElement] = useState([]);
  const [collidingElements, setCollidingElement] = useState([]);
  const [numberOfCollisions, setNumberOfCollisions] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [insertedHashValue, setinsertedHashValue] = useState([]);
  const [collidedHashValue, setcollidedHashValue] = useState([]);
  const [searchedHashValue, setsearchedHashValue] = useState([]);
  const [deletedHashValue, setdeletedHashValue] = useState([]);
  const [v1, setv1] = useState(false);
  const [leftPosition, setLeftPosition] = useState(false);
  const [topPosition, setTopPosition] = useState(false);
  const [k, setk] = useState(null);
  function vpw1(e) {
    setExplain(false);

    sethashingFunctionName(e.target.value);
    setVisible(false);
  }
  function vpw2(e) {
    setExplain(false);

    setCollisionResolution(e.target.value);
    setVisible(false);
  }

  function vpw3(e) {
    setExplain(false);

    setSize(e.target.value);
    const value = parseInt(e.target.value);

    setNumBoxes(value);
    setVisible(false);
  }
  function vpw4(e) {
    setKey(e.target.value);

    setExplain(false);
  }
  function vpw41(e) {
    setExplain(false);

    setKey1(e.target.value);
  }
  function vpw42(e) {
    setExplain(false);

    setKey2(e.target.value);
  }

  function handleSubmit(event, value) {
    console.log(hashingFunctionName, collisionResolution, size);
    event.preventDefault();
    if (
      hashingFunctionName === "Select a hashing function" ||
      collisionResolution === "Select a collision resolution technique" ||
      size === "Choose table size" ||
      hashingFunctionName === false ||
      collisionResolution === false ||
      size === false
    ) {
      alert("WRONG INPUT");

      setVisible(false);
    } else {
      setMyBoxes(Array(value).fill(-1));
      setCollidingElement([]);
      setcollidedHashValue([]);
      setsearchedHashValue([]);
      setdeletedHashValue([]);
      setv1(false);
      setInsertedElement([]);
      setDeletedElement([]);
      setSearchedElement([]);
      setNumberOfCollisions(0);
      setVisible(true);
    }
    setExplain(`Size of the Array is ${value}`);
    // setcode(` setMyBoxes(Array(value).fill(-1))`);
  }
  // console.log(isBlinking);

  function findKeyIndices(arr, keys) {
    const indices = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === keys) {
        indices.push(i);
      }
    }
    return indices;
  }
  function handleSearch() {
    let arr = findKeyIndices(boxes, key1);
    if (arr.length === 0) {
      setExplain(`KEY NOT FOUND `);
      alert("KEY NOT FOUND");
    } else {
      let s = "key";
      let v = "was";
      if (arr.length > 1) {
        s = "keys";
        v = "were";
      }
      setExplain(`Searched ${s} ${v} found at position ${arr.join(",")}`);
      const updatedElements = [...searchedElement];
      updatedElements[searchedElement.length] = key1;
      setSearchedElement(updatedElements);
      setsearchedHashValue(arr);
      setIsBlinking(true);
      setdeletedHashValue([]);
      console.log(searchedHashValue);
    }
  }
  function handleDelete() {
    let arr = findKeyIndices(boxes, key2);
    if (arr.length === 0) {
      setExplain(`KEY NOT FOUND `);
      alert("KEY NOT FOUND");
    } else {
      let s = "key";
      let v = "was";
      if (arr.length > 1) {
        s = "keys";
        v = "were";
      }
      setExplain(`Deleted ${s} ${v} found at position ${arr.join(",")}`);
      const updatedElements = [...deletedElement];
      updatedElements[deletedElement.length] = key2;
      setDeletedElement(updatedElements);

      let collElements = [...collidedHashValue];
      console.log(key2);
      console.log(arr[0]);
      console.log(collElements);
      // let index = collElements.indexOf(arr[1]);
      // console.log(index);
      // if (index !== -1) {
      //   collElements.splice(index, 1);
      // }
      // if(collElements.includes())
      let origCollEl = [...boxes];
      origCollEl = origCollEl.filter(function (number, index) {
        if (number === key2) {
          console.log(index);
          collElements = collElements.filter((number) => number !== index);
          setcollidedHashValue(collElements);
        }
      });
      console.log(origCollEl);

      console.log(collidedHashValue);
      setIsBlinking(true);
      setdeletedHashValue(arr);
      setsearchedHashValue([]);
      const updatedBoxes = [...boxes];
      for (let i = 0; i < arr.length; i++) {
        updatedBoxes[arr[i]] = -1;
      }
      setMyBoxes(updatedBoxes);
    }
  }
  function updateBox1(e) {
    e.preventDefault();
    if (key1.length <= 6 && /^\d+$/.test(key1)) {
      handleSearch();
      setKey1("");
    } else {
      alert("Please Enter a positive Integer of maximum length 6");
      setKey("");
    }
  }
  function updateBox2(e) {
    e.preventDefault();
    if (key2.length <= 6 && /^\d+$/.test(key2)) {
      handleDelete();
      setKey2("");
    } else {
      alert("Please Enter a positive Integer of maximum length 6");
      setKey2("");
    }
  }

  function handleCollision(hashValue) {
    if (!boxes.includes(-1)) {
      alert("CANNOT INSERT BECAUSE HASH TABLE IS FULL");
      return;
    }
    const updatedBoxes = [...boxes];

    if (updatedBoxes[hashValue] === -1) {
      updatedBoxes[hashValue] = key;
      setMyBoxes(updatedBoxes);
      const updatedElements = [...insertedElement];
      updatedElements[insertedElement.length] = key;
      setInsertedElement(updatedElements);

      const updatedElements1 = [...insertedHashValue];
      updatedElements1[insertedHashValue.length] = hashValue;
      setinsertedHashValue(updatedElements1);
    } else {
      const updatedElements1 = [...collidingElements];
      updatedElements1[collidingElements.length] = key;
      setCollidingElement(updatedElements1);
      setNumberOfCollisions((prevCount) => prevCount + 1);
      console.log(numberOfCollisions);

      if (collisionResolution === "Linear probing") {
        let oldhash = hashValue;
        while (updatedBoxes[hashValue] !== -1) {
          if (hashValue <= size) {
            hashValue++;
          } else {
            hashValue = 0;
            if (!boxes.includes(-1)) {
              break;
            }
          }
        }
        if (hashValue <= size) {
          setExplain(
            `Collision Happens at array index ${oldhash}
             In Linear probing the algorithm simply looks for the next available slot in the hash table
             and places the collided key there.
             So the new Hash-Index=${hashValue} `
          );
          console.log(hashValue);
          alert("COLLISION HAS OCCURED");

          const updatedElements1 = [...collidedHashValue];
          updatedElements1[collidedHashValue.length] = hashValue;
          setcollidedHashValue(updatedElements1);
          updatedBoxes[hashValue] = key;
          setMyBoxes(updatedBoxes);
        }
      } else if (collisionResolution === "Quadratic probing") {
        let oldhash = hashValue;
        let step = 0;
        let m = hashValue;
        while (
          updatedBoxes[hashValue] !== -1 &&
          hashValue <= size &&
          boxes.includes(-1) &&
          step < size
        ) {
          step++;
          hashValue = (m + step * step) % size;
          console.log(hashValue);
          setExplain(`Collision happens at array index ${oldhash} 
              In quadratic probing, If the slot hash(x) % S is full, then we try (hash(x) + 1*1) % S.
If (hash(x) + 1*1) % S is also full, then we try (hash(x) + 2*2) % S.
If (hash(x) + 2*2) % S is also full, then we try (hash(x) + 3*3) % S.
This process is repeated for all the values of i until an empty slot is found.
So the new Hash-Index is ${hashValue}`);
        }

        if (hashValue <= size) {
          alert("COLLISION HAS OCCURED");

          const updatedElements1 = [...collidedHashValue];
          updatedElements1[collidedHashValue.length] = hashValue;
          setcollidedHashValue(updatedElements1);
          updatedBoxes[hashValue] = key;
          setMyBoxes(updatedBoxes);
          return;
        }
        alert("Table size is smaller than new hash value");
        return;
      } else if (collisionResolution === "Double hashing") {
        console.log("vaibhav");
        let prime = size - 3,
          i = 1;
        let firstHashingFunction, secondhashingFunction, newhashValue;
        firstHashingFunction = hashValue;
        secondhashingFunction = prime - (key % prime);
        newhashValue =
          (firstHashingFunction + i * secondhashingFunction) % size;

        while (
          updatedBoxes[newhashValue] !== -1 &&
          newhashValue <= size &&
          i < size
        ) {
          i++;
          newhashValue =
            (firstHashingFunction + i * secondhashingFunction) % size;
        }

        if (newhashValue <= size) {
          alert("COLLISION HAS OCCURED");
          console.log(newhashValue);

          const updatedElements1 = [...collidedHashValue];
          updatedElements1[collidedHashValue.length] = newhashValue;
          setcollidedHashValue(updatedElements1);
          updatedBoxes[newhashValue] = key;
          setMyBoxes(updatedBoxes);
          setExplain(
            ` Double hashing is a collision resolution technique used in hash tables. 
            It works by using two hash functions to compute two different hash values for a key.
             The first hash function is used to compute the initial hash value, and the second hash function is used to compute the step size for the probing sequence.
            Here the new Hash-Index is ${newhashValue}`
          );
        }
      } else if (collisionResolution === "Open hashing") {
        alert("COLLISION HAS OCCURED");
        setv1(true);
        const updatedElements1 = [...collidedHashValue];
        updatedElements1[collidedHashValue.length] = hashValue;
        setcollidedHashValue(updatedElements1);
        setk(hashValue);
        const newDiv = <Div key1={key} />;
        setMyBoxes1([...boxes1, newDiv]);
      }
    }
  }

  function handleInsert1() {
    if (hashingFunctionName === "Direct Hashing") {
      return directHashing(key);
    } else if (hashingFunctionName === "Folding method") {
      return folding(key, size);
    } else if (hashingFunctionName === "Multiplication method") {
      return multiplication(key, size);
    } else if (hashingFunctionName === "Modulo division") {
      return moduloDivision(key, size);
    } else if (hashingFunctionName === "Mid-square") {
      return midSquare(key);
    }
  }

  function directHashing(key) {
    let hashValue;
    hashValue = key;
    if (hashValue < numBoxes) {
      setExplain(
        `In Direct hashing technique, the Hash-Index is calculated using formula,
         Hash-Index = key.
       Here key is ${key}
       So Hash-index is ${hashValue}  `
      );
      // setcode(``);
      handleCollision(hashValue);
    } else {
      setExplain(
        `CANNOT INSERT
        In Direct hashing technique, the Hash-Index is calculated using formula,
         Hash-Index = key.
       Here key is ${key}
       So Hash-index is ${hashValue} 
         which is greater than the array's maximum index:- ${numBoxes - 1}`
      );
    }
    if (!boxes.includes(-1)) {
      setExplain("CANNOT INSERT BECAUSE HASH TABLE IS FULL");
    }
  }

  function moduloDivision(key, size) {
    let hashValue = key % size;

    if (hashValue < numBoxes) {
      setExplain(
        `In Modulo Division technique, Hash-Index is calculated using formula,
       Hash-Index = key % size
        Here key = ${key} and size = ${size}
        So Hash-Index = ${hashValue}`
      );
      handleCollision(hashValue);
    } else {
      setExplain(
        `CANNOT INSERT
        In Modulo Division technique, Hash-Index is calculated using formula,
       Hash-Index = key % size
        Here key = ${key} and size = ${size}
        So Hash-Index = ${hashValue}
         which is greater than the arrays maximum index:- ${numBoxes - 1}`
      );
    }
    if (!boxes.includes(-1)) {
      setExplain("CANNOT INSERT BECAUSE HASH TABLE IS FULL");
    }
  }
  function multiplication(key, size) {
    let hashValue = Math.floor(size * ((key * 0.35784) % 1));

    if (hashValue < numBoxes) {
      setExplain(
        `In multiplication method, Hash-Index is calculated using formula, 
        h(K) = floor (size*((key*0.357840 ) mod 1)))
        Here key = ${key} size = ${size}
        So the Hash-Index = ${hashValue}`
      );
      handleCollision(hashValue);
    } else {
      setExplain(
        `CANNOT INSERT 
        In multiplication method, Hash-Index is calculated using formula, 
        h(K) = floor (size*((key*0.357840 ) mod 1)))
        Here key = ${key} size = ${size}
        So the Hash-Index = ${hashValue}
         which is greater than the arrays maximum index:- ${numBoxes - 1}`
      );
    }
    if (!boxes.includes(-1)) {
      setExplain("CANNOT INSERT BECAUSE HASH TABLE IS FULL");
    }
  }
  function midSquare(key) {
    let keySquare = key * key;
    const numberString = keySquare.toString();
    const middleIndex = Math.floor(numberString.length / 2);
    const middle =
      numberString.length % 2 === 0
        ? numberString.slice(middleIndex - 1, middleIndex + 1)
        : numberString.slice(middleIndex, middleIndex + 1);
    let hashValue = middle;
    console.log(hashValue);
    console.log(numBoxes);
    if (hashValue < numBoxes) {
      setExplain(`In Mid square technique, hashvalue is calculated using formula,
     h(K)= h(k x k) and then extract  the middle index
     Here key = ${key} 
    So the Hash-Index = ${hashValue}`);
      handleCollision(hashValue);
    } else {
      setExplain(`CANNOT INSERT 
      In Mid square technique, hashvalue is calculated using formula,
     h(K)= h(k x k) and then extract  the middle index
     Here key = ${key} 
    So the Hash-Index = ${hashValue}
         which is greater than the arrays maximum index:- ${numBoxes - 1}`);
    }
    if (!boxes.includes(-1)) {
      setExplain("CANNOT INSERT BECAUSE HASH TABLE IS FULL");
    }
  }

  function folding(key, size) {
    let keyString = key.toString();
    if (keyString.length === 6) {
      let a = Number(keyString.slice(0, 3));
      let b1 = keyString.slice(3, 6);
      let b2 = keyString.slice(6);
      let b = Number(b1 + b2);
      let hashValue = (a + b) % size;

      if (hashValue < numBoxes) {
        const updatedBoxes = [...boxes];
        updatedBoxes[hashValue] = key;
        setMyBoxes(updatedBoxes);
        setExplain(
          `In Folding technique,  Key ${key} is a 6 digit number.
         So we can divide it into 2 parts  a=${a} , b=${b} ,here size=${size}
         Hash-Index is calculated using formula:-
        Hash-Index = (a + b) % size
          So the Hash-Index = ${hashValue}`
        );
        handleCollision(hashValue);
      } else {
        setExplain("CANNOT INSERT BECAUSE HASH TABLE IS FULL");
      }
    } else if (keyString.length === 4) {
      let a = Number(keyString.slice(0, 2));
      let b1 = keyString.slice(2, 4);
      let b2 = keyString.slice(4);
      let b = Number(b1 + b2);
      let hashValue = (a + b) % size;

      if (hashValue < numBoxes) {
        const updatedBoxes = [...boxes];
        updatedBoxes[hashValue] = key;
        setMyBoxes(updatedBoxes);
        setExplain(
          `In Folding technique,  Key ${key} is a 4 digit number.
         So we can divide it into 2 parts  a=${a} , b=${b} ,here size=${size}
         Hash-Index is calculated using formula:-
        Hash-Index = (a + b) % size
          So the Hash-Index = ${hashValue}`
        );
        handleCollision(hashValue);
      } else {
        setExplain("CANNOT INSERT BECAUSE HASH TABLE IS FULL");
      }
    } else if (keyString.length === 2) {
      let a = Number(keyString.slice(0, 1));
      let b1 = keyString.slice(1, 2);
      let b2 = keyString.slice(2);
      let b = Number(b1 + b2);
      let hashValue = (a + b) % size;

      if (hashValue < numBoxes) {
        const updatedBoxes = [...boxes];
        updatedBoxes[hashValue] = key;
        setMyBoxes(updatedBoxes);
        setExplain(
          `In Folding technique,  Key ${key} is a 2 digit number.
         So we can divide it into 2 parts  a=${a} , b=${b} ,here size=${size}
         Hash-Index is calculated using formula:-
        Hash-Index = (a + b) % size
          So the Hash-Index = ${hashValue}`
        );
        handleCollision(hashValue);
      } else {
        setExplain("CANNOT INSERT BECAUSE HASH TABLE IS FULL");
      }
    } else {
      setExplain(`FOLDING NOT POSSIBLE. 
      Because the key  ${key} is a ${keyString.length} digit number 
      Folding of odd digit number is not possible
      `);
    }
  }
  const joinedInsertedElement = insertedElement.join(",");
  const joinedSearchedElement = searchedElement.join(",");
  const joinDeletedElement = deletedElement.join(",");
  const joinCollidedElement = collidingElements.join(",");
  // var arr2 = [1, 2, 3, 4];
  // arr2 = [];
  // console.log(arr2);
  function updateBox(e) {
    e.preventDefault();
    if (key.length <= 6 && /^\d+$/.test(key)) {
      handleInsert1();
      setKey("");
    } else {
      alert("Please Enter a positive Integer of maximum length 6");
      setKey("");
    }
  }
  return (
    <PositionContext.Provider
      value={{ leftPosition, setLeftPosition, k, topPosition, setTopPosition }}
    >
      <div className="container">
        <form
          className="containerrr"
          onSubmit={(event) => handleSubmit(event, numBoxes)}
        >
          <select value={hashingFunctionName} onChange={vpw1} name="" id="k1">
            <option>Select a hashing function </option>
            <option>Direct Hashing</option>
            <option>Multiplication method</option>
            <option>Modulo division</option>
            <option>Mid-square</option>
            <option>Folding method</option>
          </select>
          <select value={collisionResolution} onChange={vpw2} name="" id="k2">
            <option>Select a collision resolution technique</option>
            <option>Linear probing</option>
            <option>Quadratic probing</option>
            <option>Double hashing</option>
            <option>Open hashing</option>
          </select>
          <select value={size} onChange={vpw3} name="" id="k3">
            <option>Choose table size</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
          </select>
          {/* <button onClick={() => handleSubmit(numBoxes)} className="button-1">
          SUBMIT
        </button> */}
          <input className="buttonn-2" type="submit" value="SUBMIT" />
        </form>
        <div className="large-container">
          {visible && (
            <form onSubmit={(event) => updateBox(event)}>
              <div className="container-2">
                <input
                  placeholder="Enter any number"
                  className="user-input-1"
                  type="text"
                  onChange={vpw4}
                  value={key}
                />
                {/* <button onClick={updateBox} className="button-2">
                INSERT
              </button> */}
                <input className="button-2" type="submit" value="INSERT" />
              </div>
            </form>
          )}
          {visible && (
            <form onSubmit={(event) => updateBox1(event)}>
              <div className="container-2">
                <input
                  placeholder="Enter any number"
                  className="user-input-1"
                  type="text"
                  onChange={vpw41}
                  value={key1}
                />
                {/* <button onClick={updateBox1} className="button-2">
                SEARCH
              </button> */}
                <input type="submit" value="SEARCH" className="button-2" />
              </div>
            </form>
          )}
          {visible && (
            <form onSubmit={(event) => updateBox2(event)}>
              <div className="container-2">
                <input
                  placeholder="Enter any number"
                  className="user-input-1"
                  type="text"
                  onChange={vpw42}
                  value={key2}
                />
                {/* <button onClick={updateBox2} className="button-2">
                DELETE
              </button> */}
                <input className="button-2" type="submit" value="DELETE" />
              </div>
            </form>
          )}
        </div>{" "}
      </div>
      {visible && (
        <DynamicArray
          boxes={boxes}
          isBlinking={isBlinking}
          setIsBlinking={setIsBlinking}
          insertedHashValue={insertedHashValue}
          collidedHashValue={collidedHashValue}
          searchedHashValue={searchedHashValue}
          deletedHashValue={deletedHashValue}
        />
      )}

      {visible && v1 && <div>{boxes1}</div>}
      {visible && (
        <div className="conttt">
          {" "}
          <div className="explain">
            <p>EXPLAINATION :-</p>

            <p className="ee">{explain}</p>
          </div>
          <div className="elements">
            <p>INSERTED ELEMENTS :- [{joinedInsertedElement}]</p>
            <p>SEARCHED ELEMENTS :-[{joinedSearchedElement}]</p>
            <p>DELETED ELEMENTS :-[{joinDeletedElement}]</p>
            <p>COLLIDING ELEMENTS:-[{joinCollidedElement}]</p>
            <p className="number-of-collision">
              NUMBER OF COLLISIONS OCCURED:-{numberOfCollisions}
            </p>
          </div>
        </div>
      )}
    </PositionContext.Provider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainComponent />);
