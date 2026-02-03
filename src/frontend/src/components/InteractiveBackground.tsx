import { useEffect, useRef, useState } from 'react';

interface InteractiveBackgroundProps {
  isVisible: boolean;
}

export default function InteractiveBackground({ isVisible }: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const meshPointsRef = useRef<Array<{ x: number; y: number; baseX: number; baseY: number }>>([]);

  // Track mouse/touch position
  useEffect(() => {
    if (!isVisible) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePos({ x: touch.clientX, y: touch.clientY });
      }
    };

    const handleTouchEnd = () => {
      // Move cursor off-screen when touch ends
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isVisible]);

  // Initialize and animate mesh layer
  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize mesh points on resize
      initializeMeshPoints();
    };

    const initializeMeshPoints = () => {
      meshPointsRef.current = [];
      // Reduced spacing from 40 to 25 for denser mesh
      const spacing = 25;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          meshPointsRef.current.push({
            x: i * spacing,
            y: j * spacing,
            baseX: i * spacing,
            baseY: j * spacing,
          });
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw mesh points with interaction
      meshPointsRef.current.forEach((point) => {
        const dx = mousePos.x - point.baseX;
        const dy = mousePos.y - point.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // Interaction radius

        // Calculate point properties based on distance to cursor
        let opacity = 0.15;
        let size = 1;
        
        if (distance < maxDistance) {
          const influence = 1 - distance / maxDistance;
          opacity = 0.15 + influence * 0.35; // Brighten near cursor
          size = 1 + influence * 1.5; // Grow near cursor
          
          // Subtle organic movement toward cursor
          const moveAmount = influence * 8;
          point.x = point.baseX + (dx / distance) * moveAmount;
          point.y = point.baseY + (dy / distance) * moveAmount;
        } else {
          // Smoothly return to base position
          point.x += (point.baseX - point.x) * 0.1;
          point.y += (point.baseY - point.y) * 0.1;
        }

        // Draw point
        ctx.fillStyle = `rgba(200, 220, 240, ${opacity})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, mousePos]);

  // Update overlay gradient position
  useEffect(() => {
    if (!isVisible || !overlayRef.current) return;

    const overlay = overlayRef.current;
    overlay.style.setProperty('--mouse-x', `${mousePos.x}px`);
    overlay.style.setProperty('--mouse-y', `${mousePos.y}px`);
  }, [mousePos, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dark translucent overlay with localized fade-out */}
      <div
        ref={overlayRef}
        className="interactive-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Mesh layer canvas */}
      <canvas
        ref={canvasRef}
        className="mesh-layer"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </>
  );
}
