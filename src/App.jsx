import {  RouterProvider  } from 'react-router-dom'
import router from 'src/Routes/Routes.jsx'


function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App