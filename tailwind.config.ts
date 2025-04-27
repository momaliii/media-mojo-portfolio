
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for media buyer portfolio
				media: {
					purple: '#9b87f5',
					darkpurple: '#7E69AB',
					blue: '#D3E4FD',
					peach: '#FDE1D3',
					vibrantpurple: '#8B5CF6',
					orange: '#F97316',
					oceanblue: '#0EA5E9',
					pink: '#D946EF',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'pulse-slow': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'slide-in-right': {
					'0%': {
						transform: 'translateX(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'bounce-gentle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'number-count': {
					'0%': { 'content': '"0"' },
					'20%': { 'content': '"1"' },
					'40%': { 'content': '"2"' },
					'60%': { 'content': '"3"' },
					'80%': { 'content': '"4"' },
					'100%': { 'content': '"5"' },
				},
				'flip-in': {
					'0%': { transform: 'rotateY(90deg)', opacity: '0' },
					'100%': { transform: 'rotateY(0deg)', opacity: '1' }
				},
				'flip-out': {
					'0%': { transform: 'rotateY(0deg)', opacity: '1' },
					'100%': { transform: 'rotateY(90deg)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
				'bounce-gentle': 'bounce-gentle 4s infinite ease-in-out',
				'float': 'float 6s infinite ease-in-out',
				'number-count': 'number-count 2s ease-out forwards',
				'flip-in': 'flip-in 0.5s ease-out forwards',
				'flip-out': 'flip-out 0.5s ease-out forwards'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'hero-pattern': 'linear-gradient(135deg, #9b87f5 0%, #D3E4FD 100%)',
				'dark-hero-pattern': 'linear-gradient(135deg, #4d3b99 0%, #1a3b6e 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
