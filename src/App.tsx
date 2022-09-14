import "katex/dist/katex.min.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Route, Routes } from "react-router-dom";
import AdminProvider from "./context/AdminContext";
import { ProblemProvider } from "./context/ProblemContext";
import AddProblem from "./pages/AddProblem";
import Home from "./pages/Home";
import ProblemPage from "./pages/ProblemPage";
import Tags from "./pages/Tags";

function App() {
  return (
    <AdminProvider>
      <ProblemProvider>
        <div className="container mx-auto justify-center">
          <div className="grid grid-cols-12 justify-center">
            <div className="col-span-full lg:col-start-2 lg:col-span-10 my-3">
              <SkeletonTheme baseColor="#f2ebff" highlightColor="#f9f6ff">
                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route
                    path="contest/:contestNo/problem/:problemName"
                    element={<ProblemPage />}
                  />

                  <Route path="/problem/add" element={<AddProblem />} />

                  <Route path="/tags" element={<Tags />} />
                </Routes>
              </SkeletonTheme>
            </div>
          </div>
        </div>
      </ProblemProvider>
    </AdminProvider>
  );
}

export default App;
