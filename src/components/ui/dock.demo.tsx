import {
  HomeIcon,
  Code2,
  FolderKanban,
  Calculator,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

export function AppleStyleDock() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path); // Debug log
    navigate(path);
  };

  const data = [
    {
      title: 'swtlabs',
      icon: (
        <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '/',
      onClick: () => handleNavigation('/')
    },
    // Temporarily hidden AI page
    /*
    {
      title: 'sztuczna inteligencja', 
      icon: (
        <div className='h-full w-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 font-bold text-lg'>
          AI
        </div>
      ),
      href: '/ai',
      onClick: () => handleNavigation('/ai')
    },
    */
    {
      title: 'technologia',
      icon: (
        <Code2 className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '/tech',
      onClick: () => handleNavigation('/tech')
    },
    {
      title: 'kalkulator',
      icon: (
        <Calculator className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '/estimate',
      onClick: () => handleNavigation('/estimate')
    },
    {
      title: 'portfolio',
      icon: (
        <FolderKanban className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '/portfolio',
      onClick: () => handleNavigation('/portfolio')
    },
    
  ];

  return (
    <div className='flex items-center h-full'>
      <Dock className='items-center'>
        {data.map((item, idx) => (
          <DockItem
            key={idx}
            className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'
            onClick={item.onClick}
            isActive={location.pathname === item.href}
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
} 