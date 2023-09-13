import "bootswatch/dist/darkly/bootstrap.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Create from "./components/create";
import Edit from "./components/edit";
import RecordList from "./components/recordList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route exact path="/students/create" element={<Create />} />
        <Route exact path="/students/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
