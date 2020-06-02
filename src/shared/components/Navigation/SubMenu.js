import React from 'react';
import cn from 'classnames';
import { HashLink as Link } from 'react-router-hash-link';

function SubMenu(props) {
  const { menu, currentPath, isActive } = props;


  return (
    <div className={cn('nav_menu_list_item_sub',
      { active: isActive })
    }
    >
      <div className='nav_menu_list'>
        { menu.map(e => <SubMenuItem { ...{currentPath , ...e} } />) }
      </div>
    </div>
  );
}


function SubMenuItem({ currentPath, id, path, label}) {

  const isSmooth = path && path.includes('#')
  const scrollWithOffset = (el, offset) => {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: 'smooth'
    });
  }
  const linkOptions =  isSmooth ? {
    scroll :(el) => { scrollWithOffset(el, 78) }
  } : {}

  return  (
    <li
      key={id}
      className={cn('nav_menu_list_item',
        { active: currentPath === path })}
    >
      <Link 
        to={path}
        className='text' 
        {...linkOptions}
      >
        {label}
      </Link>
    </li>
  )
}

export default SubMenu;
