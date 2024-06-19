// // useTheme.ts

// import { useState } from 'react';

// export enum Theme {
//   Light = 'light',
//   Dark = 'dark',
// }

// const useTheme = () => {
//   const [theme, setTheme] = useState<Theme>(() => {
//     const storedTheme = localStorage.getItem('theme');
//     return (storedTheme as Theme) || Theme.Dark; // Default to light theme
//   });

// //   const toggleTheme = () => {
// //     const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
// //     localStorage.setItem('theme', newTheme);
// //     setTheme(newTheme);
// //   };
//     const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     console.log('New theme:', newTheme);
//     localStorage.setItem('theme', newTheme);
//     setTheme(newTheme);
//   };

//   return { theme, toggleTheme };
// };

// export default useTheme;

// useTheme.ts

// import { useState } from 'react';

// export enum Theme {
//   Light = 'light',
//   Dark = 'dark',
// }

// const useTheme = () => {
//   const [theme, setTheme] = useState<Theme>(() => {
//     const storedTheme = localStorage.getItem('theme');
//     return (storedTheme as Theme) || Theme.Dark; // Default to dark theme if not set
//   });

//   const toggleTheme = () => {
//     const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
//     localStorage.setItem('theme', newTheme);
//     setTheme(newTheme);
//   };

//   return { theme, toggleTheme };
// };

// export default useTheme;

// src/hooks/useTheme.ts
import { useState, useEffect } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme as 'light' | 'dark');
        } else {
            const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setTheme(defaultTheme);
        }
    }, []);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
};

export default useTheme;
