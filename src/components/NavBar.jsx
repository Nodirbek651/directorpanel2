import React, { useState, useEffect } from 'react';

const Navbar = ({ toggleSidebar }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignInClick = () => setIsLoginModalOpen(true);
  const handleRegisterClick = () => setIsRegisterModalOpen(true);
  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    setIsLoginModalOpen(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Parollar mos kelmaydi!');
    } else {
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
      setIsRegistered(true);
      setIsRegisterModalOpen(false);
    }
  };

  return (
    <header style={styles.header}>
   
      <div style={styles.hamburger} onClick={toggleSidebar}>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
      </div>


      <div style={styles.rightSection}>
        {!isRegistered ? (
          <div style={styles.buttons}>
            <button style={styles.button} onClick={handleSignInClick}>Kirish</button>
            <button style={styles.button} onClick={handleRegisterClick}>Ro'yxatdan o'tish</button>
          </div>
        ) : (
          <div style={styles.successMessage}>Muvaffaqiyatli royxatdan o'tdingiz</div>
        )}
      </div>

      {isLoginModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Kirish</h3>
            <form onSubmit={handleLoginSubmit}>
              <div style={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email kiriting"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="parolingizni kiriting"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <button type="submit" style={styles.submitButton}>Sign In</button>
            </form>
            <button onClick={handleCloseModal} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}

      {isRegisterModalOpen && !isRegistered && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Ro'yxatdan o'tish</h3>
            <form onSubmit={handleRegisterSubmit}>
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Ismingizni kiriting"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email kiriting"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="parol kiriting"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="parolni takrorlang"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <button type="submit" style={styles.submitButton}>Register</button>
            </form>
            <button onClick={handleCloseModal} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 90,
  },
  hamburger: {
    cursor: 'pointer',
    padding: '10px',
  },
  bar: {
    width: '30px',
    height: '4px',
    backgroundColor: '#fff',
    margin: '7px 0',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  successMessage: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '5px',
    textAlign: 'center',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  inputGroup: {
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
  },
};

export default Navbar;
