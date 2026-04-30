import React from "react";
import Times from "./components/Times";
import { historicalPeriods } from "./data/periods";

const App: React.FC = () => {
  return (
    <div className="app">
      <Times periods={historicalPeriods} />
    </div>
  );
};

export default App;
