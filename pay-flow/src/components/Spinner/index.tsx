import { ClipLoader } from "react-spinners";
import { GlassCard, Overlay } from "./style";

function Spinner() {
  return (
    <Overlay>
      <GlassCard>
        <ClipLoader color="#6b6b6b" size={40} />
      </GlassCard>
    </Overlay>
  );
}

export default Spinner;
