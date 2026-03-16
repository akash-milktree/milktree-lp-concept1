import React, { useState, useRef, useEffect } from 'react';

export const MailingListButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay so the expand animation starts first
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    // Simulate submission — replace with your real mailing list endpoint
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setEmail('');
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => setStatus('idle'), 750);
      }, 2000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="ml-float" ref={containerRef}>
      <form
        className={`ml-float__form ${isOpen ? 'ml-float__form--open' : ''}`}
        onSubmit={handleSubmit}
      >
        {/* Expandable email input area */}
        <div className={`ml-float__input-wrap ${isOpen ? 'ml-float__input-wrap--visible' : ''}`}>
          <div className="ml-float__input-inner">
            {status === 'success' ? (
              <span className="ml-float__success">You're in! We'll be in touch.</span>
            ) : (
              <>
                <input
                  ref={inputRef}
                  type="email"
                  className="ml-float__email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  autoComplete="email"
                />
                {status === 'error' && (
                  <span className="ml-float__error">Please enter a valid email</span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Subscribe / submit circle button */}
        {isOpen && (
          <button
            type="submit"
            className="ml-float__circle ml-float__circle--submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? '...' : 'Subscribe'}
          </button>
        )}

        {/* Main circle toggle button */}
        {!isOpen && (
          <button
            type="button"
            className="ml-float__circle ml-float__circle--toggle"
            onClick={() => setIsOpen(true)}
          >
            <span>Mailing<br />List</span>
          </button>
        )}
      </form>
    </div>
  );
};
