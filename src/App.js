import "bootswatch/dist/darkly/bootstrap.min.css";
import Navbar from "./components/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import RecordList from "./components/recordList";
import Create from "./components/create";
import Edit from "./components/edit";

<Routes>
  <Route exact path="/" element={<RecordList />} />
</Routes>;

function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
