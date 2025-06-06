import { useCallback, useEffect, useRef, useState } from 'react';
import '@/App.css';
import {
  CBox,
  CButton,
  CCenter,
  CHeading,
  CHStack,
  CText,
  CVStack,
} from '@/components/chakra';

function getRandom(): number {
  return Math.random();
}

const generateRandomPoint = (): { x: number; y: number } => {
  const x = getRandom();
  const y = getRandom();
  const sign = getRandom();

  if (sign < 1 / 4) return { x, y };
  if (sign < 1 / 2) return { x: -x, y };
  if (sign < 3 / 4) return { x, y: -y };
  return { x: -x, y: -y };
};

function roundByDigit(num: number, digit: number): number {
  const multiplier = Math.pow(10, digit);
  return Math.round(num * multiplier) / multiplier;
}

/**
 * 横長の時のモンテカルロシミュレーション画面
 */
export function WPiMonte() {
  const MAX_POINTS = 20000;
  const CANVAS_SIZE = 512;
  const BUTTON_NUMS = [1, 10, 100, 1000];

  const [counts, setCounts] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawPoints = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#E53E3E';
    points.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(
        (CANVAS_SIZE + pt.x * CANVAS_SIZE) / 2,
        (CANVAS_SIZE + pt.y * CANVAS_SIZE) / 2,
        1.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  }, [points]);

  const addPoints = useCallback((num: number) => {
    const newPoints: { x: number; y: number }[] = [];
    let newCounts = 0;

    for (let i = 0; i < num; i++) {
      const pt = generateRandomPoint();
      newPoints.push(pt);
      if (pt.x ** 2 + pt.y ** 2 <= 1) {
        newCounts++;
      }
    }

    setPoints((prev) => prev.concat(newPoints));
    setCounts((prev) => prev + newCounts);
    setTotalPoints((prev) => prev + num);
  }, []);

  const resetPoints = useCallback(() => {
    setPoints([]);
    setCounts(0);
    setTotalPoints(0);
  }, []);

  useEffect(() => {
    drawPoints();
  }, [drawPoints]);

  return (
    <CHStack>
      <CVStack>
        <CHeading>{`4 x ${counts} / ${totalPoints} = ${roundByDigit(
          (4 * counts) / Math.max(1, totalPoints),
          8
        ).toFixed(8)}`}</CHeading>
        <CText>{`点の数: ${totalPoints}`}</CText>
        <CText>{`円内の点の数: ${counts}`}</CText>
        <CBox position="relative" w={CANVAS_SIZE} aspectRatio="1" bg="blue.400">
          <CCenter w="100%" h="100%">
            <CBox
              w={CANVAS_SIZE}
              aspectRatio="1"
              bg="white"
              borderRadius="full"
            />
          </CCenter>
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
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
        <CVStack>
          {BUTTON_NUMS.map((num, i) => {
            return (
              <CButton
                key={i}
                color="teal"
                variant="surface"
                w="full"
                onClick={() => addPoints(num)}
                disabled={totalPoints === MAX_POINTS}
              >
                {`+${num}`}
              </CButton>
            );
          })}
        </CVStack>
        <CHStack>
          <CButton
            color="red.500"
            variant="ghost"
            w="full"
            onClick={resetPoints}
          >
            RESET
          </CButton>
        </CHStack>
      </CVStack>
    </CHStack>
  );
}
