import { useEffect, useState } from "react";
import StandardButton from "../ui/button";
import { formatTime } from "@/lib/utils";
import { LoaderIcon, toast } from "react-hot-toast";

interface Props {
  afterTimer: () => any | Promise<any>;
}

export default function ResendEmailButton({ afterTimer }: Props) {
  const [remainingTimeout, setRemainingTimeout] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [timerActive, setTimerActive] = useState(true);

  const clickHandler = async () => {
    if (timerActive || remainingTimeout < 300) {
      return;
    }
    setIsLoading(true);
    try {
      await afterTimer();
      setTimerActive(true);
    } catch (error) {
      toast.error("Something went wrong. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval: any;
    if (timerActive) {
      interval = setInterval(() => {
        setRemainingTimeout((prevState) => {
          if (prevState === 1) {
            setTimerActive(false);
            return 300;
          }
          return prevState - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  return (
    <section className="relative">
      <StandardButton
        className={`w-56 h-14 ${
          timerActive && "opacity-30 border-action cursor-not-allowed"
        }`}
        onClick={clickHandler}
        type="button"
      >
        {isLoading ? (
          <LoaderIcon className="animate-spin text-2xl" />
        ) : (
          "Resend Email"
        )}
      </StandardButton>
      {timerActive && (
        <p className="absolute font-mono -top-2 left-2 text-sm text-action bg-main px-2">
          {formatTime(remainingTimeout)}
        </p>
      )}
    </section>
  );
}
