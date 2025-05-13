import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import {
  CBox,
  CButton,
  CCenter,
  CHeading,
  CHStack,
  CText,
  CVStack,
} from './components/chakra';

function getRandom(): number {
  return Math.random();
}

function roundByDigit(num: number, digit: number): number {
  const multiplier = Math.pow(10, digit);
  return Math.round(num * multiplier) / multiplier;
}

export default function App() {
  const MAX_POINTS = 20000;
  const CANVAS_SIZE = 512;

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

  const addPoint = useCallback(() => {
    const y = getRandom();
    const x = getRandom();
    const sign = getRandom();
    let newPoint;

    if (sign < 1 / 4) {
      newPoint = { x, y };
    } else if (sign < 1 / 2) {
      newPoint = { x: -x, y };
    } else if (sign < 3 / 4) {
      newPoint = { x, y: -y };
    } else {
      newPoint = { x: -x, y: -y };
    }
    setPoints((prev) => prev.concat(newPoint));

    if (y ** 2 + x ** 2 < 1.0) {
      setCounts((prev) => prev + 1);
    }
    setTotalPoints((prev) => prev + 1);
  }, []);

  const addTenPoints = useCallback(() => {
    const newPoints: { x: number; y: number }[] = [];
    let newCounts = 0;

    for (let i = 0; i < 10; i++) {
      const y = getRandom();
      const x = getRandom();
      const sign = getRandom();
      let newPoint;

      if (sign < 1 / 4) {
        newPoint = { x, y };
      } else if (sign < 1 / 2) {
        newPoint = { x: -x, y };
      } else if (sign < 3 / 4) {
        newPoint = { x, y: -y };
      } else {
        newPoint = { x: -x, y: -y };
      }

      newPoints.push(newPoint);
      if (y ** 2 + x ** 2 <= 1) {
        newCounts++;
      }
    }

    setPoints((prev) => prev.concat(newPoints));
    setCounts((prev) => prev + newCounts);
    setTotalPoints((prev) => prev + 10);
  }, []);

  const addHundredPoints = useCallback(() => {
    const newPoints: { x: number; y: number }[] = [];
    let newCounts = 0;

    for (let i = 0; i < 100; i++) {
      const y = getRandom();
      const x = getRandom();
      const sign = getRandom();
      let newPoint;

      if (sign < 1 / 4) {
        newPoint = { x, y };
      } else if (sign < 1 / 2) {
        newPoint = { x: -x, y };
      } else if (sign < 3 / 4) {
        newPoint = { x, y: -y };
      } else {
        newPoint = { x: -x, y: -y };
      }

      newPoints.push(newPoint);
      if (y ** 2 + x ** 2 <= 1) {
        newCounts++;
      }
    }

    setPoints((prev) => prev.concat(newPoints));
    setCounts((prev) => prev + newCounts);
    setTotalPoints((prev) => prev + 100);
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
      <CHStack>
        <CButton
          color="teal"
          variant="surface"
          onClick={addPoint}
          disabled={totalPoints === MAX_POINTS}
        >
          +1
        </CButton>
        <CButton
          color="teal"
          variant="surface"
          onClick={addTenPoints}
          disabled={totalPoints === MAX_POINTS}
        >
          +10
        </CButton>
        <CButton
          color="teal"
          variant="surface"
          onClick={addHundredPoints}
          disabled={totalPoints === MAX_POINTS}
        >
          +100
        </CButton>
      </CHStack>
      <CHStack>
        <CButton color="red.500" variant="ghost" onClick={resetPoints}>
          RESET
        </CButton>
      </CHStack>
    </CVStack>
  );
}
