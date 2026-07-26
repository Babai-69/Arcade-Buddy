import React from 'react';

export function ThreeBackground() {
  return (
    <>
      {/* Background Orbs */}
      <div className="home-orbs-container fixed inset-0 pointer-events-none z-[-2]">
        <div className="home-orb home-orb1"></div>
        <div className="home-orb home-orb2"></div>
        <div className="home-orb home-orb3"></div>
      </div>
      {/* Dark/Light Gradient Background */}
      <div className="home-bg-gradient fixed inset-0 pointer-events-none z-[-3]"></div>
    </>
  );
}
