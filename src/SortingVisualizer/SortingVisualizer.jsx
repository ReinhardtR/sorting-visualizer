import React from "react";
import "./SortingVisualizer.css";

// Sorting Algorithms
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort.js";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 50;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

// This is the color of the array bar shortly after its height has been changed.
const TERTIARY_COLOR = "purple";

export class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.generateRandomArray();
  }

  generateRandomArray() {
    // Reset the color of array bars, if there is any.
    const arrayBars = document.getElementsByClassName("array-bar");
    if (arrayBars !== 0) {
      for (let arrayBar of arrayBars) {
        arrayBar.style.backgroundColor = "lightgrey";
      }
    }

    // Generate the random array and set state.
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(10, 1000));
    }
    this.setState({ array });
  }

  mergeSort() {
    // Run merge sort algorithm.
    // To get list of animations in order.
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2; // Every third element of the array.
      if (isColorChange) {
        // Change the color of the two array bars being compared.
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          // Set the height of an array bar.
          // Temporarily change the color of that array bar.
          const [barOneIdx, newHeight] = animations[i];
          const barOne = arrayBars[barOneIdx];
          barOne.style.height = `${newHeight / 10}vh`;
          barOne.style.backgroundColor = TERTIARY_COLOR;
          setTimeout(() => {
            barOne.style.backgroundColor = PRIMARY_COLOR;
          }, ANIMATION_SPEED_MS);
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  // testSortingAlgorithms() {
  //   for (let i = 0; i < 100; i++) {
  //     const array = [];
  //     const length = randomIntFromInterval(1, 1000);
  //     for (let j = 0; j < length; j++) {
  //       array.push(randomIntFromInterval(-1000, 1000));
  //     }
  //     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  //     const mergeSortedArray = mergeSort(array.slice());
  //     console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
  //   }
  // }

  render() {
    const { array } = this.state;

    return (
      <>
        <div id="wrap">
          <div id="buttons-container">
            <button onClick={() => this.generateRandomArray()}>
              Generate New Array
            </button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
          </div>
          <div className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{ height: `${value / 10}vh` }}
              ></div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(array1, array2) {
//   if (array1.length !== array2.length) return false;
//   for (let i = 0; i < array1.length; i++) {
//     if (array1[i] !== array2[i]) return false;
//   }
//   return true;
// }
