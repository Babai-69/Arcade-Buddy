const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

const newMeshBg = `  .mesh-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: #F4F7FF;
    background-image: 
      linear-gradient(rgba(100, 116, 139, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(100, 116, 139, 0.07) 1px, transparent 1px),
      linear-gradient(135deg, #F4F7FF 0%, #EBF1FF 100%);
    background-size: 32px 32px, 32px 32px, 100% 100%;
    background-position: center center, center center, center center;
  }

  .dark .mesh-bg {
    background-color: #0D0B14;
    background-image: 
      linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
      linear-gradient(135deg, #0D0B14 0%, #161224 100%);
    background-size: 32px 32px, 32px 32px, 100% 100%;
    background-position: center center, center center, center center;
  }`;

const oldMeshBg = `  .mesh-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: #f0f4f8;
    background-image: radial-gradient(at 0% 0%, rgba(66, 133, 244, 0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(52, 168, 83, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(251, 188, 5, 0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(234, 67, 53, 0.1) 0px, transparent 50%);
  }

  .dark .mesh-bg {
    background-color: #0f172a;
    background-image: radial-gradient(at 0% 0%, rgba(66, 133, 244, 0.1) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(52, 168, 83, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(251, 188, 5, 0.05) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(234, 67, 53, 0.05) 0px, transparent 50%);
  }`;

const newGlass = `  .glass-card {
    background: #FFFFFF;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid #E2E8F0;
    border-radius: 20px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .dark .glass-card {
    background: rgba(30, 27, 46, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  }

  .dark .glass-card:hover {
    border-color: rgba(192, 132, 252, 0.5); /* Violet glow */
    box-shadow: 0 8px 32px 0 rgba(192, 132, 252, 0.15);
  }

  .glass-panel {
    background: #FFFFFF;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid #E2E8F0;
    border-radius: 20px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .dark .glass-panel {
    background: rgba(30, 27, 46, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  }`;

const oldGlass = `  .glass-card {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  }
  
  .dark .glass-card {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  }

  .glass-panel {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  }

  .dark .glass-panel {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  }`;

if (code.includes(newMeshBg)) {
  code = code.replace(newMeshBg, oldMeshBg);
}
if (code.includes(newGlass)) {
  code = code.replace(newGlass, oldGlass);
}

fs.writeFileSync('src/index.css', code, 'utf8');
console.log("Reverted CSS to old background and glass");
