import { Box } from "@chakra-ui/react";
import AgeGroupPriceList from "./components/AgeGroupPriceList";
import { useState } from "react";

const App = () => {
  const [result, setResult] = useState([{ ageGroup: [0, 20], price: "0" }]);
  return (
    <div>
      <Box>
        <AgeGroupPriceList result={result} onChange={setResult} />
      </Box>
    </div>
  );
};

export default App;
