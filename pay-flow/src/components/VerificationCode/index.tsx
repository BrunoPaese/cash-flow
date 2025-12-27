import { useRef, useState, type InputHTMLAttributes } from "react";
import { CodeContainer, CodeInput } from "./style";

interface VerificationCodeProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: "light" | "dark";
  error?: string;
  onComplete?: (code: string) => void;
}

export function VerificationCode({
  theme = "light",
  error,
  ...props
}: VerificationCodeProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    const fullCode = newCode.join("");

    if (fullCode.length === 6 && !newCode.includes("")) {
      props.onComplete?.(fullCode);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <CodeContainer>
      {code.map((digit, index) => (
        <CodeInput
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(event) => handleChange(event.target.value, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          theme={theme}
          hasError={!!error}
          ref={(element) => {
            inputsRef.current[index] = element;
          }}
          {...props}
        />
      ))}
    </CodeContainer>
  );
}
