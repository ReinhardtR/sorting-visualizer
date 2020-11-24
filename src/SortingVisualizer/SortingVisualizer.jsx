import React from "react";
import Slider, { SliderTooltip, Handle } from "rc-slider";
import "rc-slider/assets/index.css";
import "./SortingVisualizer.css";

// Sorting Algorithms
import { getMergeSortAnimations } from "./Algorithms/mergeSort.js";

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "yellow";

// This is the color of the array bar shortly after its height has been changed.
const TERTIARY_COLOR = "red";

export class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      numberOfArrayBars: 50,
      animationSpeed: 50,
      animationIsRunning: false,
    };
  }

  componentDidMount() {
    this.generateRandomArray();
  }

  generateRandomArray() {
    // Generate the random array and set state.
    const array = [];
    for (let i = 0; i < this.state.numberOfArrayBars - 1; i++) {
      array.push(randomIntFromInterval(10, 1000));
    }
    this.setState({ array });
  }

  mergeSort() {
    console.log(this.state.array);
    // Run merge sort algorithm.
    // To get list of animations in order.
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i <= animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2; // Every third element of the array.
      if (i === animations.length) {
        console.log("in");
        setTimeout(() => {
          setTimeout(() => {
            for (let arrayBar of arrayBars) {
              arrayBar.style.backgroundColor = "white";
            }
          }, this.state.animationSpeed);
          this.setState({ animationIsRunning: false });
        }, i * this.state.animationSpeed);
      } else if (isColorChange) {
        // Change the color of the two array bars being compared.
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animationSpeed);
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
          }, this.state.animationSpeed);
        }, i * this.state.animationSpeed);
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
    return (
      <>
        <div id="wrap">
          <div id="ui">
            <div className="section-title">Actions</div>
            <button
              onClick={() => this.generateRandomArray()}
              disabled={this.state.animationIsRunning}
            >
              New Array
            </button>
            <button
              onClick={() => {
                this.setState({ animationIsRunning: true }, () =>
                  this.mergeSort()
                );
              }}
              disabled={this.state.animationIsRunning}
            >
              Merge Sort
            </button>
            <div className="section-title">Settings</div>
            <div className="slider-title">Number of Bars</div>
            <Slider
              className="slider"
              trackStyle={{ backgroundColor: PRIMARY_COLOR }}
              handle={amountHandle}
              defaultValue={this.state.numberOfArrayBars}
              min={1}
              max={100}
              onChange={(value) => {
                this.setState({ numberOfArrayBars: value });
                this.generateRandomArray();
              }}
              disabled={this.state.animationIsRunning}
            />
            <div className="slider-title">Animation Delay</div>
            <Slider
              className="slider"
              trackStyle={{ backgroundColor: PRIMARY_COLOR }}
              handle={timeHandle}
              defaultValue={this.state.numberOfArrayBars}
              min={1}
              max={100}
              onChange={(value) => {
                this.setState({ animationSpeed: value });
              }}
              disabled={this.state.animationIsRunning}
            />
          </div>
          <div className="array-container">
            {this.state.array.map((value, idx) => (
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

const amountHandle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value}`}
      visible={dragging}
      placement="bottom"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const timeHandle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} ms`}
      visible={dragging}
      placement="bottom"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};
