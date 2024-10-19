import { useEffect } from "react";
import { getNumberIntervals } from "./util";
import { Box } from "@chakra-ui/react";
import PriceInput from "./components/PriceInput";

function App() {
  // useEffect(() => {
  //   getNumberIntervals();
  // }, []);

  return (
    <div>
      <Box>
        <PriceInput label="入住費用" subLabel="每人每晚" currency="TWD" />
      </Box>
    </div>
  );
}

export default App;
