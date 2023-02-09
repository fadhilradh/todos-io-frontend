import { useDispatch, useSelector } from "react-redux";
import { decrement, add } from "../store/keranjang";
import { useWindowSize } from "../utils/hooks/useWindowSize";

export default function Home() {
  const size = useWindowSize();

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="text-2xl text-blue-500">screen width : {size.width}</h1>
      <h1 className="text-2xl text-blue-500">screen height : {size.height}</h1>
    </div>
  );
}
