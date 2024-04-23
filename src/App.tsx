import { ReactElement, useState } from 'react'

function App(): ReactElement {
  const [count, setCount] = useState(0)

  return <div className="p-20 border shadow-xl border-gray-50 rounded-xl"></div>
}

export default App
