import Container from "../../Components/Container"
import { useState } from "react"
import { RiDeleteBack2Line } from "react-icons/ri";
import { evaluate } from "mathjs"

const styles = {
  operator: "bg-blue-300 text-white rounded-lg py-4 px-2 w-full h-full text-xl",
  number: "bg-blue-100 text-blue-900 rounded-lg py-4 px-2 w-full h-full text-xl",
  equal: "bg-yellow-500 text-blue-900 rounded-lg py-4 px-2 w-full h-full col-span-2 text-xl",
}

const calculatorButtons = [
  { value: "C", style: styles.operator, icon: RiDeleteBack2Line },
  { value: "AC", style: styles.operator },
  { value: "%", style: styles.operator },
  { value: "/", style: styles.operator },
  { value: "7", style: styles.number },
  { value: "8", style: styles.number },
  { value: "9", style: styles.number },
  { value: "*", style: styles.operator },
  { value: "4", style: styles.number },
  { value: "5", style: styles.number },
  { value: "6", style: styles.number },
  { value: "-", style: styles.operator },
  { value: "1", style: styles.number },
  { value: "2", style: styles.number },
  { value: "3", style: styles.number },
  { value: "+", style: styles.operator },
  { value: "0", style: styles.number },
  { value: ".", style: styles.number },
  { value: "=", type: "equal", style: styles.equal },
]

function App() {
  const [expression, setExpression] = useState("")

  const handleButtonClick = (btn) => {
    const operators = ["%", "/", "*", "+", "-"]
    switch (btn) {
      case "AC":
        setExpression("")
        break
      case "C":
        setExpression(expression.slice(0, -1))
        break
      case "%":
      case "/":
      case "*":
      case "+":
      case "-":
        if (expression === "") {
          return
        } else if (operators.includes(expression.slice(-1))) {
          setExpression(expression.slice(0, -1) + btn)
        } else {
          setExpression(expression + btn)
        }
        break
      case "=":
        try {
          const res = evaluate(expression)
          setExpression(res.toString())
        } catch (error) {
          setExpression("Error")
        }
        break
      default:
        setExpression(expression + btn)
        break
    }
  }

  const handleInputChange = (event) => {
    setExpression(event.target.value)
  }

  return (
    <Container>
      <div className="w-full flex flex-col gap-4">
        <h1 className="self-start">Calculator</h1>
        <input
          type="text"
          value={expression}
          onChange={handleInputChange}
          placeholder="0"
          className="text-end text-4xl font-semibold w-full no-arrows"
        />
      </div>

      <ul className="grid grid-cols-4 justify-items-center items-center gap-1 w-full">
        {calculatorButtons.map((btn, index) => (
          <li key={index} className={btn.style}>
            <button
              onClick={() => handleButtonClick(btn.value)}
              className="w-full h-full flex justify-center items-center"
            >
              {btn?.icon ? <btn.icon /> : btn.value}
            </button>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default App