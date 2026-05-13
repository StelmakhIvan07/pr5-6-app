import { useState } from 'react';
import styles from './RegForm.module.css';
import { loginUser, registerUser } from '../../API/authorization.js';

function RegForm({ onClose, onSuccess }) {
  // 'login' або 'register'
  const [mode, setMode] = useState('login');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let userData;
      if (mode === 'login') {
        userData = await loginUser({ email: formData.email, password: formData.password });
      } else {
        userData = await registerUser(formData);
      }
      onSuccess ? onSuccess(userData) : onClose(); // передаємо юзера або просто закриваємо
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (e) => {
    e.preventDefault();
    setError('');
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const isLogin = mode === 'login';

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.closeBtn} onClick={onClose}>
          <i className="bx bx-x"></i>
        </button>

        <form onSubmit={handleSubmit}>
          <h1>{isLogin ? 'Login' : 'Register'}</h1>

          {/* Поле Username — тільки для реєстрації */}
          {!isLogin && (
            <div className={styles.inputBox}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <i className="bx bx-user"></i>
            </div>
          )}

          {/* Email */}
          <div className={styles.inputBox}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <i className="bx bx-envelope"></i>
          </div>

          {/* Password */}
          <div className={styles.inputBox}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          {/* Повідомлення про помилку */}
          {error && <p className={styles.errorMsg}>{error}</p>}

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
          </button>

          <div className={styles.registerLink}>
            {isLogin ? (
              <p>
                Don&apos;t have an account?{' '}
                <a href="#" onClick={switchMode}>Register</a>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <a href="#" onClick={switchMode}>Login</a>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegForm;
