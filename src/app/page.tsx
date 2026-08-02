"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import CustomScrollbar from '../components/CustomScrollbar';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const repoUrl = "https://github.com/insaneodyssey26/hyprland";

  return (
    <main>
      <CustomScrollbar />
      <Navbar currentPath="/" />

      <section className="hero">
        <h2 className="fade-up">Minimal. Fast.<br />Wayland Native.</h2>
        <p className="fade-up delay-1">
          A finely tuned Arch Linux desktop environment built entirely for efficiency. Dynamic theming, GPU-accelerated terminals, and zero bloat.
        </p>
        <div className="image-wrapper fade-up delay-2" onClick={() => setSelectedImage("/assets/desktop.png")}>
          <img src="/assets/desktop.png" alt="Desktop Screenshot" />
        </div>
      </section>

      <section className="section-wide">
        <h3 className="fade-up">Overview</h3>
        <p className="fade-up">
          A minimal, keyboard-centric environment built for daily use. Configurations are synchronized across components for a unified experience.
        </p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="card fade-up">
            <h4>Dynamic Theming</h4>
            <p>Colors are automatically generated from your active wallpaper using Matugen. The entire system adapts instantly.</p>
          </div>
          <div className="card fade-up delay-1">
            <h4>Terminal Environment</h4>
            <p>Customized Zsh configuration featuring fzf-based fuzzy finding, zoxide directory navigation, and syntax highlighting.</p>
          </div>
          <div className="card fade-up delay-2">
            <h4>Scrolling Layout System</h4>
            <p>Seamlessly toggle between standard tiling and an infinite paper-scroll window layout directly from the Fuzzel control center.</p>
          </div>
          <div className="card fade-up delay-3">
            <h4>Window Management</h4>
            <p>Keyboard-focused workflow using carefully optimized Hyprland bindings for extreme efficiency and workspace management.</p>
          </div>
        </div>
      </section>

      <section className="fade-up">
        <h3>UI Suite</h3>
        <p>A unified Wayland suite featuring Waybar, SwayNC, and Fuzzel. Everything strictly follows the system color scheme.</p>
        <div className="image-wrapper" onClick={() => setSelectedImage("/assets/ui_components.png")}>
          <img src="/assets/ui_components.png" alt="UI Components" />
        </div>
      </section>

      <section className="fade-up">
        <h3>Hardware Constraints & Fixes</h3>
        <p>Because this setup is optimized for my specific workflow, there are a few hardware-specific lines of code that you will need to change for your own machine. Here is how to fix them:</p>
        
        <div className="alert">
          <h4>1. Dual-Boot Hard Drive Paths</h4>
          <p>My file search scripts scan specific Windows partition mounts. If you don't have these, they will fail to find anything.</p>
          <p><strong>Fix:</strong> Open <a href={`${repoUrl}/blob/main/hypr/scripts/project_launcher.sh`} target="_blank">project_launcher.sh</a> and <a href={`${repoUrl}/blob/main/hypr/scripts/file_search.sh`} target="_blank">file_search.sh</a> and change the directory arrays to point to your actual folders.</p>
        </div>

        <div className="alert">
          <h4>2. Waybar Hardware Sensors</h4>
          <p>My Waybar configuration expects a direct PCI hardware path for CPU temperatures and an Asus ROG app for the battery.</p>
          <p><strong>Fix:</strong> Open <a href={`${repoUrl}/blob/main/waybar/config.jsonc`} target="_blank">config.jsonc</a>. Under the temperature module, delete the `hwmon-path-abs` line. Under battery, change `BAT1` to `BAT0`.</p>
        </div>

        <div className="alert">
          <h4>3. Monitor Configuration</h4>
          <p>My configuration explicitly hardcodes my laptop screen (`eDP-1`) to run at 144Hz.</p>
          <p><strong>Fix:</strong> Open <a href={`${repoUrl}/blob/main/hypr/configs/monitors.lua`} target="_blank">monitors.lua</a> and change `eDP-1` to your monitor's name, or use `,preferred,auto,auto` to make it universal.</p>
        </div>
      </section>

      <section className="fade-up">
        <h3>Installation</h3>
        <p>Run the automated setup script on a fresh Arch Linux installation. It will safely symlink all configurations to your <code>~/.config/</code> folder.</p>
        <pre>
{`git clone https://github.com/insaneodyssey26/hyprland.git ~/hyprland
cd ~/hyprland
./setup.sh`}
        </pre>
      </section>

      <footer>
        <p>
          Created by <a href="https://github.com/insaneodyssey26" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)' }}>Masum Ali</a>. 
          Licensed under MIT.
        </p>
      </footer>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <span className="image-modal-close">&times;</span>
          <img src={selectedImage} alt="Enlarged view" />
        </div>
      )}
    </main>
  );
}
