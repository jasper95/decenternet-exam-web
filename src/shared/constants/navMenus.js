export default [
  {
    id: 1,
    path: '/',
    label: 'Home',

  },
  {
    id: 2,
    path: '/files',
    label: 'Files',
    submenu: [
      {
        id: 3,
        path: '/#downloads',
        label: 'Downloads',
      },
      {
        id: 4,
        path: '/upload/shapefile',
        label: 'Upload Shapefile',
      },
      {
        id: 5,
        path: '/upload/file',
        label: 'Upload File',
      },
    ],
  },
  {
    id: 6,
    path: '/sub-projects',
    label: 'Sub Projects',
  },
  {
    id: 7,
    path: '/map',
    label: 'Maps',
  },
  {
    id: 8,
    path: '/blogs',
    label: 'Blogs',
  },
  {
    id: 9,
    path: '/news',
    label: 'News',
  },
  {
    id: 10,
    path: '/albums',
    label: 'Albums',
  },
  {
    id: 11,
    path: '/#collaborators',
    label: 'Collaborators',
  },
  {
    id: 12,
    label: 'About',
    submenu: [
      {
        id: 11,
        path: '/#about',
        label: 'About Us',
      },
      {
        id: 12,
        path: '/team',
        label: 'Team',
      },
      {
        id: 13,
        path: '/#contact-us',
        label: 'Contact Us',
      },
    ],
  },
];
