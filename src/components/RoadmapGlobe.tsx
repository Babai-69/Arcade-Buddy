import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function RoadmapGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const canvas = mountRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 200);
    const isMobile = window.innerWidth < 700;
    camera.position.set(0, 0, isMobile ? 24 : 19);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(width, height);
    canvas.appendChild(renderer.domElement);

    const globeGeo = new THREE.IcosahedronGeometry(6.4, isMobile ? 1 : 3);
    const globeMat = new THREE.MeshBasicMaterial({ color: 0x2a3550, wireframe: true, transparent: true, opacity: 0.35 });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    globe.position.set(isMobile ? 2 : 8.5, -0.5, -6);
    scene.add(globe);

    const coreMat = new THREE.MeshBasicMaterial({ color: 0x070b14, transparent: true, opacity: 0.6 });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(6.15, 1), coreMat);
    core.position.copy(globe.position);
    scene.add(core);

    const markerCount = isMobile ? 5 : 9;
    const markers = new THREE.Group();
    for (let i = 0; i < markerCount; i++) {
      const geo = new THREE.SphereGeometry(0.05, 8, 8);
      const mat = new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0x6FE3D6 : 0x5B8DEF, transparent: true, opacity: 0.85 });
      const m = new THREE.Mesh(geo, mat);
      const angle = (i / markerCount) * Math.PI * 2;
      const radius = 7.3 + Math.random() * 0.9;
      m.userData = { angle, radius, speed: 0.035 + Math.random() * 0.02, yOff: (Math.random() - 0.5) * 4, tilt: Math.random() * 0.6 };
      markers.add(m);
    }
    markers.position.copy(globe.position);
    scene.add(markers);

    const starCount = isMobile ? 300 : 900;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 160;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 160;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 160;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x5B6478, size: 0.07, transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    let mouseX = 0, mouseY = 0, tX = 0, tY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5);
      mouseY = (e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      globe.rotation.y = t * 0.035;
      core.rotation.y = globe.rotation.y;

      tX += (mouseX * 0.25 - tX) * 0.03;
      tY += (mouseY * 0.18 - tY) * 0.03;
      camera.position.x = tX * 2.2;
      camera.position.y = -tY * 1.4;
      camera.lookAt(0, 0, -2);

      markers.children.forEach((m) => {
        const d = m.userData;
        d.angle += d.speed * 0.01;
        m.position.set(Math.cos(d.angle) * d.radius, d.yOff + Math.sin(t * 0.3 + d.angle) * 0.4, Math.sin(d.angle) * d.radius * Math.cos(d.tilt));
      });

      stars.rotation.y = t * 0.003;

      const scrollT = Math.min(window.scrollY / (window.innerHeight * 1.0), 1);
      globe.position.x = (isMobile ? 2 : 8.5) + scrollT * (isMobile ? 0 : 4);
      globe.position.y = -0.5 - scrollT * 3;
      core.position.copy(globe.position);
      markers.position.copy(globe.position);
      const s = 1 - scrollT * 0.3;
      globe.scale.setScalar(s);
      core.scale.setScalar(s);
      markers.scale.setScalar(s);
      renderer.domElement.style.opacity = (1 - scrollT * 0.7).toString();

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      globeGeo.dispose();
      globeMat.dispose();
      coreMat.dispose();
      markers.children.forEach(m => {
        (m as THREE.Mesh).geometry.dispose();
        ((m as THREE.Mesh).material as THREE.Material).dispose();
      });
      starGeo.dispose();
      starMat.dispose();
      
      renderer.dispose();
      if (canvas && renderer.domElement) {
        canvas.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div 
        ref={mountRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }} 
      />
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-5 mix-blend-overlay" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")'
      }}></div>
    </>
  );
}
