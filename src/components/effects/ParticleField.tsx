/**
 * 粒子场组件
 * 用于 3D 沉浸和极光主题的星空粒子效果
 */

'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/lib/theme-context';

/**
 * 星星粒子
 */
function Stars() {
  const ref = useRef<THREE.Points>(null);
  const { theme } = useTheme();

  // 生成随机星星位置
  const particles = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  // 动画：缓慢旋转
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }
  });

  // 根据主题获取颜色
  const getColor = () => {
    if (theme === 'immersive') return '#8b5cf6';
    if (theme === 'aurora') return '#00ff87';
    return '#ffffff';
  };

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={getColor()}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

interface ParticleFieldProps {
  className?: string;
}

/**
 * 粒子场背景
 */
export function ParticleField({ className }: ParticleFieldProps) {
  const { theme } = useTheme();

  // 只在沉浸和极光主题显示
  if (theme !== 'immersive' && theme !== 'aurora') return null;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  );
}

export default ParticleField;
