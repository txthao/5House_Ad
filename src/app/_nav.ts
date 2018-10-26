export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Management'
  },
  {
    name: 'Base Setting',
    icon: 'icon-puzzle',
    children: [
      {
        name: '1. Categories',
        url: '/categories',
        icon: 'icon-puzzle'
      },
      {
        name: '2. Provinces',
        url: '/provinces',
        icon: 'icon-puzzle'
      },
      {
        name: '3. Districts',
        url: '/districts',
        icon: 'icon-puzzle'
      },
      {
        name: '4. Wards',
        url: '/wards',
        icon: 'icon-puzzle'
      },
      {
        name: '5. Streets',
        url: '/streets',
        icon: 'icon-puzzle'
      },
    ]
  },

  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },

];
