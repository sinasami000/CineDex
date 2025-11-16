import { ThreeDot } from "react-loading-indicators";

function LoadingAnimation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-zinc-300">
      <ThreeDot color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
    </div>
  );
}

export default LoadingAnimation;
