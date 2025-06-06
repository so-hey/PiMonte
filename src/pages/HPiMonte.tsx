import '@/App.css';
import {
  CBox,
  CButton,
  CCenter,
  CHeading,
  CHStack,
  CStack,
  CText,
  CVStack,
} from '@/components/chakra';

const roundByDigit = (num: number, digit: number): number => {
  const multiplier = Math.pow(10, digit);
  return Math.round(num * multiplier) / multiplier;
};

interface HPiMonteProps {
  buttonNums: number[];
  maxPoints: number;
  counts: number;
  totalPoints: number;
  addPoints: (num: number) => void;
  resetPoints: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  canvasSize: number;
}

/**
 * 縦長の時のモンテカルロシミュレーション画面
 */
export function HPiMonte({
  buttonNums,
  maxPoints,
  counts,
  totalPoints,
  addPoints,
  resetPoints,
  canvasRef,
  canvasSize,
}: HPiMonteProps) {
  return (
    <CVStack>
      <CVStack>
        <CHeading
          as="h1"
          color="orange.400"
        >{`4 x ${counts} / ${totalPoints} = ${roundByDigit(
          (4 * counts) / Math.max(1, totalPoints),
          8
        ).toFixed(8)}`}</CHeading>
        <CText>{`点の数: ${totalPoints}`}</CText>
        <CText>{`円内の点の数: ${counts}`}</CText>
        <CBox position="relative" w={canvasSize} aspectRatio="1" bg="blue.400">
          <CCenter w="100%" h="100%">
            <CBox
              w={canvasSize}
              aspectRatio="1"
              bg="white"
              borderRadius="full"
            />
          </CCenter>
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </CBox>
      </CVStack>

      <CVStack>
        <CHStack>
          {buttonNums.map((num, i) => {
            return (
              <CButton
                key={i}
                color="teal"
                variant="surface"
                onClick={() => addPoints(num)}
                disabled={totalPoints >= maxPoints}
              >
                {`+${num}`}
              </CButton>
            );
          })}
        </CHStack>
        <CStack>
          <CButton
            color="red.500"
            variant="ghost"
            w="full"
            onClick={resetPoints}
          >
            RESET
          </CButton>
        </CStack>
      </CVStack>
    </CVStack>
  );
}
