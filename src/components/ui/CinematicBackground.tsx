"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Math helper for random points in a sphere
function randomInSphere(numPoints: number, radius: number) {
    const points = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = radius * Math.cbrt(Math.random());
        
        points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        points[i * 3 + 2] = r * Math.cos(phi);
    }
    return points;
}

function Starfield() {
    const ref = useRef<THREE.Points>(null);
    const sphere = useMemo(() => randomInSphere(5000, 15), []); // 5000 particles in a radius of 15

    useFrame((state, delta) => {
        if (ref.current) {
            // Slow rotation for a cinematic drift
            ref.current.rotation.x -= delta / 20;
            ref.current.rotation.y -= delta / 30;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#0ea5e9" // primary-500
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

export default function CinematicBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#030712]"> {/* deep dark background */}
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <Starfield />
            </Canvas>
        </div>
    );
}
