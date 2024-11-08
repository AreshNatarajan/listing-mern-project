import GroceryList from "./Components/GroceryList";

function App(){
  const uil = process.env.REACT_APP_BACKEND_URI
  console.log(uil);
  
  return(
    <>
     <div className="container" >
         <GroceryList/>
     </div>
     
    </>
  )
}

export default App;
