"use client";

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

interface ConfigItem {
  id: string;
  name: string;
  category: string;
  repoPath: string;
  installPath: string;
  description: string;
}

const CONFIGS: ConfigItem[] = [
  { id: 'hypr-main', name: 'Hyprland (Main)', category: 'Desktop', repoPath: 'hypr/hyprland.lua', installPath: '~/.config/hypr/hyprland.lua', description: 'The core configuration for the Hyprland compositor written in Lua.' },
  { id: 'hypr-binds', name: 'Hyprland Keybinds', category: 'Desktop', repoPath: 'hypr/configs/binds.lua', installPath: '~/.config/hypr/configs/binds.lua', description: 'All keyboard shortcuts for window management and app launching.' },
  { id: 'hypr-autostart', name: 'Hyprland Autostart', category: 'Desktop', repoPath: 'hypr/configs/autostart.lua', installPath: '~/.config/hypr/configs/autostart.lua', description: 'Executes daemons and background tasks when Hyprland launches.' },
  { id: 'hypr-monitors', name: 'Hyprland Monitors', category: 'Desktop', repoPath: 'hypr/configs/monitors.lua', installPath: '~/.config/hypr/configs/monitors.lua', description: 'Display resolution, refresh rate, and scaling configurations.' },
  { id: 'hypr-settings', name: 'Hyprland Settings', category: 'Desktop', repoPath: 'hypr/configs/settings.lua', installPath: '~/.config/hypr/configs/settings.lua', description: 'General settings, animations, and window decoration rules.' },
  { id: 'hypr-lock', name: 'Hyprlock', category: 'Desktop', repoPath: 'hypr/hyprlock.conf', installPath: '~/.config/hypr/hyprlock.conf', description: 'The premium glassmorphic lockscreen configuration.' },
  { id: 'hypr-idle', name: 'Hypridle', category: 'Desktop', repoPath: 'hypr/hypridle.conf', installPath: '~/.config/hypr/hypridle.conf', description: 'Idle management daemon (turns off screen, locks session, suspends).' },
  { id: 'waybar', name: 'Waybar (Config)', category: 'UI Suite', repoPath: 'waybar/config.jsonc', installPath: '~/.config/waybar/config.jsonc', description: 'The top status bar containing workspaces, clock, battery, and system tray.' },
  { id: 'waybar-css', name: 'Waybar (Style)', category: 'UI Suite', repoPath: 'waybar/style.css', installPath: '~/.config/waybar/style.css', description: 'The CSS styling for the Waybar.' },
  { id: 'fuzzel', name: 'Fuzzel (Launcher)', category: 'UI Suite', repoPath: 'fuzzel/fuzzel.ini', installPath: '~/.config/fuzzel/fuzzel.ini', description: 'The minimalist application launcher triggered by SUPER + D.' },
  { id: 'swaync', name: 'SwayNC (Notifications)', category: 'UI Suite', repoPath: 'swaync/config.json', installPath: '~/.config/swaync/config.json', description: 'The notification center configuration.' },
  { id: 'swaync-css', name: 'SwayNC (Style)', category: 'UI Suite', repoPath: 'swaync/style.css', installPath: '~/.config/swaync/style.css', description: 'The CSS styling for the notification center.' },
  { id: 'zsh', name: 'Zsh Shell', category: 'Terminal', repoPath: '.zshrc', installPath: '~/.zshrc', description: 'The highly optimized Zsh configuration featuring fzf and zoxide.' },
  { id: 'fish', name: 'Fish Shell', category: 'Terminal', repoPath: 'fish/config.fish', installPath: '~/.config/fish/config.fish', description: 'The Fish shell equivalent of the Zsh configuration.' },
  { id: 'kitty', name: 'Kitty Terminal', category: 'Terminal', repoPath: 'kitty/kitty.conf', installPath: '~/.config/kitty/kitty.conf', description: 'The GPU-accelerated terminal emulator configuration.' },
  { id: 'foot', name: 'Foot Terminal', category: 'Terminal', repoPath: 'foot/foot.ini', installPath: '~/.config/foot/foot.ini', description: 'A lightweight Wayland-native terminal emulator.' },
  { id: 'fastfetch', name: 'Fastfetch', category: 'Terminal', repoPath: 'fastfetch/config.jsonc', installPath: '~/.config/fastfetch/config.jsonc', description: 'The system information fetch utility shown on terminal startup.' },
  { id: 'cava', name: 'Cava (Audio Visualizer)', category: 'Terminal', repoPath: 'cava/config', installPath: '~/.config/cava/config', description: 'Terminal-based audio visualizer configuration.' },
  { id: 'setup', name: 'Automated Installer', category: 'System', repoPath: 'setup.sh', installPath: '~/hyprland/setup.sh', description: 'The automated script to safely symlink all these configs to your system.' }
];

export default function ConfigsPage() {
  const [activeId, setActiveId] = useState<string>("hypr-main");
  const [fileContent, setFileContent] = useState<string>("Loading configuration...");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const activeConfig = CONFIGS.find(c => c.id === activeId) || CONFIGS[0];
  const repoUrl = "https://github.com/insaneodyssey26/hyprland";

  useEffect(() => {
    setLoading(true);
    setFileContent("Fetching file from GitHub...");
    setCopied(false);
    
    fetch(`https://raw.githubusercontent.com/insaneodyssey26/hyprland/main/${activeConfig.repoPath}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then(text => {
        setFileContent(text);
        setLoading(false);
      })
      .catch(() => {
        setFileContent(`404: Not Found\nThe file '${activeConfig.repoPath}' could not be fetched from GitHub.`);
        setLoading(false);
      });
  }, [activeConfig.repoPath]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dirPath = activeConfig.installPath.substring(0, activeConfig.installPath.lastIndexOf('/'));
  const installCommand = `mkdir -p ${dirPath} && curl -sL https://raw.githubusercontent.com/insaneodyssey26/hyprland/main/${activeConfig.repoPath} > ${activeConfig.installPath}`;

  return (
    <main style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar currentPath="/configs" />

      <div className="explorer-container fade-up">
        
        <div className="explorer-sidebar">
          <h3>Tools & Software</h3>
          <div className="explorer-file-list" style={{ marginTop: '16px' }}>
            {['Desktop', 'UI Suite', 'Terminal', 'System'].map(category => (
              <div key={category} style={{ marginBottom: '16px' }}>
                <div style={{ padding: '0 16px', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1px', marginBottom: '8px' }}>
                  {category}
                </div>
                {CONFIGS.filter(c => c.category === category).map(config => (
                  <button 
                    key={config.id} 
                    className={`explorer-file-btn ${activeId === config.id ? 'active' : ''}`}
                    onClick={() => setActiveId(config.id)}
                    style={{ display: 'block', width: '100%', padding: '10px 16px' }}
                  >
                    {config.name}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="explorer-viewer">
          <div className="explorer-info-header">
            <div style={{ flex: 1 }}>
              <h2>{activeConfig.name}</h2>
              <p>{activeConfig.description}</p>
              
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Manual Save Path:</span><br/>
                <code style={{ fontFamily: 'var(--font-geist-mono)', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{activeConfig.installPath}</code>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Install via Terminal:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <code style={{ fontFamily: 'var(--font-geist-mono)', background: 'rgba(0,0,0,0.5)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', color: '#10b981', flex: 1, overflowX: 'auto', whiteSpace: 'nowrap' }}>
                    {installCommand}
                  </code>
                  <button 
                    onClick={() => navigator.clipboard.writeText(installCommand)} 
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                    title="Copy Command"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
            
            <div className="explorer-actions" style={{ marginTop: '8px' }}>
              <button className="primary copy-btn" onClick={handleCopy}>
                {copied ? 'File Copied!' : 'Copy Config'}
              </button>
              <a href={`${repoUrl}/blob/main/${activeConfig.repoPath}`} target="_blank" rel="noreferrer" className="secondary-btn">GitHub</a>
            </div>
          </div>

          <pre id="code-viewer-scroll" className="explorer-code" style={{ overflowY: 'auto' }}>
            <code style={{ fontFamily: 'var(--font-geist-mono)' }}>{fileContent}</code>
          </pre>
        </div>
      </div>
    </main>
  );
}
