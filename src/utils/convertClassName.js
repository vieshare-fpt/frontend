import styles from "src/styles/About.module.css";

export function convert(props) {
    const myArray = props.split(" ");
    let total = "";
    // Add each number to the total
    for (var i = 0; i < myArray.length; i++) {
      total += `${styles[`${myArray[i]}`]} `;
    }
    // Return to the total
    return total;
  }