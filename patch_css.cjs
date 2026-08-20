const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

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

if (code.includes(oldMeshBg)) {
  code = code.replace(oldMeshBg, newMeshBg);
  console.log("Patched mesh-bg CSS.");
} else {
  console.log("Failed to find exact oldMeshBg string.");
}

fs.writeFileSync('src/index.css', code, 'utf8');
