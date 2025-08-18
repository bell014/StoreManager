import React, { useState, useEffect } from 'react';
import { login } from '../apiService';
import { Icon } from '@iconify/react';
import { Link, useHistory } from 'react-router-dom';
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      history.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Theme-aware colors
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-700';
  const inputBg = theme === 'dark' ? 'bg-[#344054]' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-[#475467]' : 'border-gray-200';
  const labelColor = theme === 'dark' ? 'text-[#D0D5DD]' : 'text-gray-600';
  const linkColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-700';
  const hoverLinkColor = theme === 'dark' ? 'hover:text-[#EAECF0]' : 'hover:text-gray-800';
  const dividerColor = theme === 'dark' ? 'bg-[#475467]' : 'bg-gray-200';

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-[#000000]' : 'bg-gray-100'}`} style={{ zIndex: 1000 }}>
      <div className={`w-80 rounded-xl ${theme === 'dark' ? 'bg-[#000000]' : 'bg-white'} p-8 ${textColor} shadow-lg relative`} style={{ border: '1px solid red' }}>
        <button 
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === 'dark' ? (
            <Icon icon="mdi:weather-sunny" className="w-5 h-5" />
          ) : (
            <Icon icon="mdi:weather-night" className="w-5 h-5" />
          )}
        </button>
        <h1 className="text-center text-2xl font-bold">Login</h1>
        
        <form onSubmit={handleSubmit} className="mt-6">
          {error && (
            <div className={`mb-4 p-2 bg-red-500 text-white rounded text-sm`}>
              {error}
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email" className={`block text-sm ${labelColor} mb-1`}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-md border ${borderColor} ${inputBg} px-4 py-3 text-sm focus:border-gray-500 focus:outline-none`}
              required
            />
          </div>

          <div className="input-group mt-4">
            <label htmlFor="password" className={`block text-sm ${labelColor} mb-1`}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-md border ${borderColor} ${inputBg} px-4 py-3 text-sm focus:border-gray-500 focus:outline-none`}
              required
            />
            <div className="flex justify-end mt-2">
              <a href="#" className={`text-xs ${labelColor} ${hoverLinkColor} hover:underline`}>
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-6 rounded-md ${theme === 'dark' ? 'bg-[#475467] hover:bg-[#344054]' : 'bg-gray-700 hover:bg-gray-600'} py-3 font-medium text-white disabled:opacity-50`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="social-message mt-8 flex items-center">
          <div className={`line flex-1 h-px ${dividerColor}`}></div>
          <div className={`message px-3 text-sm ${labelColor}`}>
            Login with social accounts
          </div>
          <div className={`line flex-1 h-px ${dividerColor}`}></div>
        </div>

        <div className="social-icons mt-4 flex justify-center space-x-4">
          <button className={`icon rounded p-3 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <Icon icon="mdi:google" className="h-5 w-5" />
          </button>
          <button className={`icon rounded p-3 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <Icon icon="mdi:github" className="h-5 w-5" />
          </button>
          <button className={`icon rounded p-3 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <Icon icon="mdi:twitter" className="h-5 w-5" />
          </button>
        </div>

        <div className={`signup mt-8 text-center text-sm ${labelColor}`}>
          Don't have an account?{' '}
          <Link to="/signup" className={`${linkColor} ${hoverLinkColor} hover:underline`}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
