"use client";

import React, { useState } from "react";
import "../chatbot.css";

interface LoginCardProps {
  onLogin: (userData: { name: string; email: string }) => void;
  onClose: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ onLogin, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim()) {
      onLogin(formData);
    }
  };

  return (
    <div className="login-card-overlay">
      <div className="login-card">
        <button onClick={onClose} className="login-card-close">
          ×
        </button>
        <h3>Silahkan Login Terlebih Dahulu</h3>
        <p>Untuk mengakses chatbot</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nama"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
