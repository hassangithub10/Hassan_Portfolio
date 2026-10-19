"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "@/lib/gsap";
import { motionState, prefersReducedMotion } from "@/lib/motion";

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const ORB_VERT = /* glsl */ `
uniform float uTime; uniform float uAmp; uniform float uFreq;
varying vec3 vNormal; varying vec3 vView; varying float vNoise;
${NOISE}
float height(vec3 n){
  float a=snoise(n*uFreq+vec3(0.0,uTime*0.12,uTime*0.08));
  float b=snoise(n*uFreq*2.3-vec3(uTime*0.18));
  return (a*0.55+b*0.16)*uAmp;
}
void main(){
  vec3 n=normalize(position);
  vec3 up=abs(n.y)>0.99?vec3(1.0,0.0,0.0):vec3(0.0,1.0,0.0);
  vec3 t=normalize(cross(up,n));
  vec3 b=normalize(cross(n,t));
  float e=0.03;
  vec3 n1=normalize(n+t*e);
  vec3 n2=normalize(n+b*e);
  float h0=height(n);
  vec3 p0=n*(1.0+h0);
  vec3 p1=n1*(1.0+height(n1));
  vec3 p2=n2*(1.0+height(n2));
  vec3 nn=normalize(cross(p1-p0,p2-p0));
  if(dot(nn,n)<0.0) nn=-nn;
  vNoise=h0/max(uAmp,0.001);
  vec4 mv=modelViewMatrix*vec4(p0,1.0);
  vView=normalize(-mv.xyz);
  vNormal=normalize(normalMatrix*nn);
  gl_Position=projectionMatrix*mv;
}`;

const ORB_FRAG = /* glsl */ `
uniform vec3 uTeal; uniform vec3 uAmber; uniform float uDim;
varying vec3 vNormal; varying vec3 vView; varying float vNoise;
void main(){
  vec3 n=normalize(vNormal);
  float fres=pow(1.0-max(dot(n,normalize(vView)),0.0),2.4);
  float d1=max(dot(n,normalize(vec3(-0.75,0.45,0.8))),0.0);
  float d2=max(dot(n,normalize(vec3(0.85,-0.25,0.6))),0.0);
  vec3 col=vec3(0.015,0.025,0.04)+uTeal*d1*0.5+uAmber*d2*0.6;
  col+=fres*mix(uTeal,uAmber,smoothstep(-0.7,0.7,vNoise))*1.35;
  gl_FragColor=vec4(col*uDim,1.0);
  #include <colorspace_fragment>
}`;

const DUST_VERT = /* glsl */ `
uniform float uTime; uniform float uScroll; uniform float uPR; uniform vec3 uTeal; uniform vec3 uAmber;
attribute vec3 aSeed; attribute float aSize;
varying vec3 vColor; varying float vAlpha;
void main(){
  vec3 p=position;
  p.y=mod(p.y+uTime*0.12*(0.3+aSeed.x)+uScroll*(1.0+aSeed.y*4.0)+8.0,16.0)-8.0;
  p.x+=sin(uTime*0.2+aSeed.z*6.2831)*0.3;
  vec4 mv=modelViewMatrix*vec4(p,1.0);
  gl_Position=projectionMatrix*mv;
  gl_PointSize=aSize*uPR*(16.0/-mv.z);
  vColor=mix(uTeal,uAmber,step(0.55,aSeed.z));
  vAlpha=0.12+0.5*aSeed.y;
}`;

const DUST_FRAG = /* glsl */ `
varying vec3 vColor; varying float vAlpha;
void main(){
  float d=length(gl_PointCoord-0.5);
  float a=smoothstep(0.5,0.0,d);
  gl_FragColor=vec4(vColor,a*vAlpha);
  #include <colorspace_fragment>
}`;

type Key = { id: string; x: number; y: number; z: number; s: number; amp: number; dim: number; ring: number };
const FIELDS = ["x", "y", "z", "s", "amp", "dim", "ring"] as const;

/** Where the sculpture sits in each section. The scene blends between these as you scroll. */
const KEYS: Key[] = [
    { id: "home", x: 2.7, y: 0.1, z: 0, s: 1.0, amp: 0.16, dim: 0.95, ring: 0.5 },
    { id: "promise", x: -3.2, y: -0.2, z: -1.5, s: 0.7, amp: 0.3, dim: 0.55, ring: 0.3 },
    { id: "work", x: 0, y: 3.4, z: -5, s: 0.45, amp: 0.1, dim: 0.3, ring: 0.1 },
    { id: "services", x: 3.6, y: -0.3, z: -1.5, s: 0.75, amp: 0.22, dim: 0.5, ring: 0.35 },
    { id: "process", x: -3.6, y: 0.2, z: -2, s: 0.65, amp: 0.18, dim: 0.45, ring: 0.3 },
    { id: "proof", x: 0, y: 0, z: -4, s: 0.95, amp: 0.38, dim: 0.35, ring: 0.2 },
    { id: "faq", x: 3.6, y: 0.4, z: -3, s: 0.6, amp: 0.15, dim: 0.35, ring: 0.2 },
    { id: "contact", x: 2.6, y: 0.1, z: -0.5, s: 1.05, amp: 0.14, dim: 0.95, ring: 0.6 },
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function WebGLScene() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const reduced = prefersReducedMotion();
        const coarse = window.matchMedia("(pointer: coarse)").matches;

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: !coarse,
                alpha: true,
                powerPreference: "high-performance",
            });
        } catch {
            return; // No WebGL: the CSS gradient fallback behind the canvas remains.
        }

        let pr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
        renderer.setPixelRatio(pr);
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(0, 0, 9);

        const teal = new THREE.Color("#1e1e24");
        const amber = new THREE.Color("#92140c");

        // Sculpture
        const rig = new THREE.Group();
        scene.add(rig);

        const orbGeo = new THREE.IcosahedronGeometry(1, coarse ? 14 : 30);
        // A live AI/technology network replaces the organic stone sculpture.
        // The triangulated icosphere reads as a neural mesh; its nodes and orbital
        // paths move independently to suggest connected systems and data flow.
        const orbMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color("#1e1e24"),
            wireframe: true,
            transparent: true,
            opacity: 0.28,
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        orb.scale.setScalar(1.55);
        rig.add(orb);

        const nodePositions = orbGeo.getAttribute("position");
        const nodeGeo = new THREE.BufferGeometry();
        nodeGeo.setAttribute("position", nodePositions.clone());
        const nodeMat = new THREE.PointsMaterial({
            color: new THREE.Color("#92140c"),
            size: coarse ? 0.035 : 0.025,
            transparent: true,
            opacity: 0.95,
            sizeAttenuation: true,
        });
        const networkNodes = new THREE.Points(nodeGeo, nodeMat);
        networkNodes.scale.setScalar(1.57);
        rig.add(networkNodes);

        const ringGeo = new THREE.TorusGeometry(1, 0.006, 6, 240);
        const ringMatA = new THREE.MeshBasicMaterial({ color: amber, transparent: true, opacity: 0.5 });
        const ringMatB = new THREE.MeshBasicMaterial({ color: teal, transparent: true, opacity: 0.5 });
        const ringA = new THREE.Mesh(ringGeo, ringMatA);
        const ringB = new THREE.Mesh(ringGeo, ringMatB);
        ringA.scale.setScalar(2.3);
        ringB.scale.setScalar(2.85);
        ringA.rotation.set(1.2, 0.3, 0);
        ringB.rotation.set(0.5, 1.1, 0.4);
        rig.add(ringA, ringB);

        // Dust motes
        const N = coarse ? 320 : 900;
        const pos = new Float32Array(N * 3);
        const seed = new Float32Array(N * 3);
        const size = new Float32Array(N);
        for (let i = 0; i < N; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 26;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
            seed[i * 3] = Math.random();
            seed[i * 3 + 1] = Math.random();
            seed[i * 3 + 2] = Math.random();
            size[i] = 0.6 + Math.random() * 1.8;
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 3));
        dustGeo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
        const dustMat = new THREE.ShaderMaterial({
            vertexShader: DUST_VERT,
            fragmentShader: DUST_FRAG,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                uTime: { value: 0 },
                uScroll: { value: 0 },
                uPR: { value: pr },
                uTeal: { value: teal },
                uAmber: { value: amber },
            },
        });
        const dust = new THREE.Points(dustGeo, dustMat);
        dust.frustumCulled = false;
        scene.add(dust);

        // Section marks (measured from non-pinned [data-scene] wrappers)
        let secs: { key: Key; top: number }[] = [];
        const measure = () => {
            secs = KEYS.flatMap((key) => {
                const el = document.querySelector(`[data-scene="${key.id}"]`);
                if (!el) return [];
                return [{ key, top: el.getBoundingClientRect().top + window.scrollY }];
            }).sort((a, b) => a.top - b.top);
        };

        const cur: Record<(typeof FIELDS)[number], number> = { x: 2.7, y: 0.1, z: 0, s: 1, amp: 0.16, dim: 0.95, ring: 0.5 };
        const tgt = { ...cur };
        let localProgress = 0;

        const sample = () => {
            if (!secs.length) return;
            const vh = window.innerHeight;
            const y = window.scrollY + vh * 0.5;
            const w = vh * 0.7;
            const out = {} as Record<(typeof FIELDS)[number], number>;
            for (const f of FIELDS) out[f] = secs[0].key[f];
            for (let k = 1; k < secs.length; k++) {
                const t = smooth(clamp((y - (secs[k].top - w)) / (2 * w), 0, 1));
                for (const f of FIELDS) out[f] += (secs[k].key[f] - secs[k - 1].key[f]) * t;
            }
            let idx = 0;
            for (let k = 0; k < secs.length; k++) if (secs[k].top <= y) idx = k;
            const end = secs[idx + 1]?.top ?? document.documentElement.scrollHeight;
            localProgress = clamp((y - secs[idx].top) / Math.max(end - secs[idx].top, 1), 0, 1);

            const aspect = window.innerWidth / window.innerHeight;
            const xs = Math.min(1, aspect / 1.6);
            const portrait = aspect < 0.9;
            tgt.x = out.x * xs + (localProgress - 0.5) * 0.9 * xs;
            tgt.y = out.y + (portrait ? 1.3 : 0);
            tgt.z = out.z;
            tgt.s = out.s * (portrait ? 0.78 : 1);
            tgt.amp = out.amp;
            tgt.dim = out.dim * (portrait ? 0.75 : 1);
            tgt.ring = out.ring;
        };

        const resize = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / Math.max(h, 1);
            camera.updateProjectionMatrix();
            measure();
            sample();
            if (reduced) draw(0);
        };

        const clock = new THREE.Clock();
        let time = 0;
        let raf = 0;
        let running = false;
        let frames = 0;
        let acc = 0;

        function draw(dt: number) {
            time += dt;
            sample();
            const k = reduced ? 1 : 1 - Math.exp(-dt * 3.5);
            for (const f of FIELDS) cur[f] += (tgt[f] - cur[f]) * k;

            const v = clamp(Math.abs(motionState.velocity) / 2600, 0, 1);
            const sy = motionState.scrollY;

            rig.position.set(cur.x + motionState.mouseX * 0.25, cur.y + motionState.mouseY * 0.18, cur.z);
            rig.scale.setScalar(cur.s);
            orb.rotation.y += dt * (0.12 + v * 1.4);
            orb.rotation.x = Math.sin(time * 0.2) * 0.15 + motionState.mouseY * 0.2 + sy * 0.0003;
            ringA.rotation.z = sy * 0.0007 + time * 0.05;
            ringB.rotation.z = -sy * 0.0005 - time * 0.04;
            ringMatA.opacity = cur.ring;
            ringMatB.opacity = cur.ring * 0.8;

            orbMat.opacity = 0.16 + cur.dim * 0.22;
            nodeMat.opacity = 0.55 + cur.dim * 0.4;
            networkNodes.rotation.y = orb.rotation.y * -0.72;
            networkNodes.rotation.x = orb.rotation.x * -0.65;
            networkNodes.scale.setScalar(1.57 + Math.sin(time * 1.3) * 0.025 + v * 0.06);
            dustMat.uniforms.uTime.value = time;
            dustMat.uniforms.uScroll.value = sy * 0.0012;

            camera.position.x = motionState.mouseX * 0.35;
            camera.position.y = motionState.mouseY * 0.2;
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        }

        const loop = () => {
            if (!running) return;
            const dt = Math.min(clock.getDelta(), 0.05);
            draw(dt);
            // Adaptive resolution: step down if the device can't hold ~45fps.
            frames++;
            acc += dt;
            if (acc >= 1.5) {
                const fps = frames / acc;
                if (fps < 40 && pr > 1) {
                    pr = Math.max(1, pr - 0.25);
                    renderer.setPixelRatio(pr);
                    dustMat.uniforms.uPR.value = pr;
                }
                frames = 0;
                acc = 0;
            }
            raf = requestAnimationFrame(loop);
        };
        const start = () => {
            if (running || reduced) return;
            running = true;
            clock.getDelta();
            raf = requestAnimationFrame(loop);
        };
        const stop = () => {
            running = false;
            cancelAnimationFrame(raf);
        };
        const onVis = () => (document.hidden ? stop() : start());

        resize();
        // Start at the right pose with no easing-in from default values.
        for (const f of FIELDS) cur[f] = tgt[f];
        start();

        window.addEventListener("resize", resize);
        document.addEventListener("visibilitychange", onVis);
        ScrollTrigger.addEventListener("refresh", measure);

        return () => {
            stop();
            window.removeEventListener("resize", resize);
            document.removeEventListener("visibilitychange", onVis);
            ScrollTrigger.removeEventListener("refresh", measure);
            orbGeo.dispose();
            nodeGeo.dispose();
            nodeMat.dispose();
            orbMat.dispose();
            ringGeo.dispose();
            ringMatA.dispose();
            ringMatB.dispose();
            dustGeo.dispose();
            dustMat.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div aria-hidden className="scene-wrap pointer-events-none fixed inset-0 z-0">
            <canvas ref={canvasRef} className="block h-full w-full" />
        </div>
    );
}
