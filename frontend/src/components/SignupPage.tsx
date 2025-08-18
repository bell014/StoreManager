import React, { useState } from 'react';
import { signup } from '../apiService';
import { Icon } from '@iconify/react';
import { Link, useHistory } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
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
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await signup({ email, password, name });
      console.log('Signup successful:', response);
      if (response.redirectTo) {
        history.push(response.redirectTo);
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
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
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-[#000000]' : 'bg-gray-100'}`}>
      <div className={`w-80 rounded-xl ${theme === 'dark' ? 'bg-[#000000]' : 'bg-white'} p-8 ${textColor} shadow-lg relative`}>
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
        <h1 className="text-center text-2xl font-bold">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="mt-6">
          {error && (
            <div className={`mb-4 p-2 bg-red-500 text-white rounded text-sm`}>
              {error}
            </div>
          )}

          <div className="input-group">
            <label htmlFor="name" className={`block text-sm ${labelColor} mb-1`}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full rounded-md border ${borderColor} ${inputBg} px-4 py-3 text-sm focus:border-gray-500 focus:outline-none`}
              required
            />
          </div>

          <div className="input-group mt-4">
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
          </div>

          <div className="input-group mt-4">
            <label htmlFor="confirmPassword" className={`block text-sm ${labelColor} mb-1`}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full rounded-md border ${borderColor} ${inputBg} px-4 py-3 text-sm focus:border-gray-500 focus:outline-none`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-6 rounded-md ${theme === 'dark' ? 'bg-[#475467] hover:bg-[#344054]' : 'bg-gray-700 hover:bg-gray-600'} py-3 font-medium text-white disabled:opacity-50`}
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <div className={`mt-8 text-center text-sm ${labelColor}`}>
          Already have an account?{' '}
          <Link to="/login" className={`${linkColor} ${hoverLinkColor} hover:underline`}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
