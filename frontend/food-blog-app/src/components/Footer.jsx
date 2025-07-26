import React from 'react';

export default function Footer() {
  return (
    <div className='footer'>
      <p>&copy; {new Date().getFullYear()} Food Blog. All rights reserved.</p>
    </div>
  );
}
