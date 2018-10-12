"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navItems = [
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
        url: '/base-setting',
        icon: 'icon-puzzle',
        children: [
            {
                name: '1. Categories',
                url: '/base-setting/categories',
                icon: 'icon-puzzle'
            },
            {
                name: '2. Provinces',
                url: '/base-setting/provinces',
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
//# sourceMappingURL=_nav.js.map