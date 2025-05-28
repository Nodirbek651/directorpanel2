import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {

      localStorage.setItem('authToken', 'dummy-token');
      navigate('/dashboard');
    } else {
      alert('Iltimos, foydalanuvchi nomi va parolni kiriting');
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, #root {
          margin: 0; padding: 0; height: 100vh; width: 100vw;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .login-container {
          background: #1f1f38;
          padding: 40px 30px;
          border-radius: 12px;
          width: 320px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          color: #f0f0f5;
          text-align: center;
          transition: transform 0.3s ease;
        }
        .login-container:hover {
          transform: scale(1.03);
          box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }
        .login-title {
          margin-bottom: 25px;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 1.2px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        input[type="text"],
        input[type="password"] {
          padding: 14px 18px;
          border-radius: 8px;
          border: none;
          font-size: 16px;
          outline: none;
          background-color: #333353;
          color: #eaeaff;
          transition: background-color 0.2s ease;
          box-shadow: inset 0 0 5px #5c5c90;
        }
        input[type="text"]:focus,
        input[type="password"]:focus {
          background-color: #49497a;
          box-shadow: 0 0 8px #8674ff;
        }
        .password-wrapper {
          position: relative;
        }
        .toggle-password {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 18px;
          user-select: none;
          color: #a9a9ff;
          transition: color 0.3s ease;
        }
        .toggle-password:hover {
          color: #fff;
        }
        button {
          padding: 14px;
          border: none;
          border-radius: 8px;
          background: #7b68ee;
          color: white;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          box-shadow: 0 5px 15px rgba(123, 104, 238, 0.5);
        }
        button:hover {
          background: #9a86ff;
          box-shadow: 0 8px 25px rgba(154, 134, 255, 0.7);
        }
        @media (max-width: 400px) {
          .login-container {
            width: 90vw;
            padding: 30px 20px;
          }
        }
      `}</style>

      <div className="login-container" role="main" aria-label="Login form">
        <h1 className="login-title">Tizimga Kirish</h1>
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="Foydalanuvchi nomi"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            aria-label="Foydalanuvchi nomi"
            autoComplete="username"
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Parol"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              aria-label="Parol"
              autoComplete="current-password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
              role="button"
              aria-pressed={showPassword}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword); }}
              title={showPassword ? 'Parolni yashirish' : 'Parolni ko‘rsatish'}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit">Kirish</button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
