import { useCallback, useEffect, useRef, useState } from 'react';
import '@/App.css';
import { HPiMonte } from './HPiMonte';
import { WPiMonte } from './WPiMonte';

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

export function PiMonte() {
  const MAX_POINTS = 20000;
  const BUTTON_NUMS = [1, 10, 100, 1000];

  const [counts, setCounts] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [canvasSize, setCanvasSize] = useState<number>(512);
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
        (canvasSize + pt.x * canvasSize) / 2,
        (canvasSize + pt.y * canvasSize) / 2,
        1.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  }, [points, canvasSize]);

  const addPoints = useCallback(
    (n: number) => {
      const num = Math.min(n, MAX_POINTS - totalPoints);
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
    },
    [totalPoints]
  );

  const resetPoints = useCallback(() => {
    setPoints([]);
    setCounts(0);
    setTotalPoints(0);
  }, []);

  useEffect(() => {
    drawPoints();
  }, [drawPoints]);

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(
        Math.min(window.innerWidth * 0.8, window.innerHeight * 0.6)
      );
    };

    handleResize(); // 初期サイズ設定
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );

  useEffect(() => {
    const onResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      {isLandscape ? (
        <HPiMonte
          buttonNums={BUTTON_NUMS}
          maxPoints={MAX_POINTS}
          counts={counts}
          totalPoints={totalPoints}
          addPoints={addPoints}
          resetPoints={resetPoints}
          canvasRef={canvasRef}
          canvasSize={canvasSize}
        />
      ) : (
        <WPiMonte />
      )}
    </>
  );
}
