import React, { useState } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import { List, ListItem, FontIcon } from 'react-md';
import cn from 'classnames';
import 'sass/components/adminPortal/index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from 'shared/redux/app/reducer';
import menu from 'shared/constants/adminRoutes';

function AdminPortal(props) {
  const dispatch = useDispatch();
  const globalIsSidebarCollapsed = useSelector(state => state.app.isSidebarCollapsed);
  const { history, location, onLogout } = props;

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar(!globalIsSidebarCollapsed));
  };

  return (
    <div className={cn('adminPortal', {
      'adminPortal-sidebarCollapsed': globalIsSidebarCollapsed,
    })}
    >
      <TopNav
        className="adminPortal_topnav"
        isSidebarOpen={globalIsSidebarCollapsed}
        handleToggleSidebar={handleToggleSidebar}
        onLogout={onLogout}
      />
      <Sidebar
        history={history}
        location={location}
        className={cn('adminPortal_sidebar', {
          'adminPortal_sidebar-collapsed': globalIsSidebarCollapsed,
        })}
        menu={menu}
      />
      <div className="adminPortal_container">
        <div className="dbContainer">
          {props.children}
        </div>
      </div>
    </div>
  );
}


function TopNav(props) {
  const {
    className,
    handleToggleSidebar,
    isSidebarOpen,
    onLogout,
  } = props;
  return (
    <div className={`${className} topnav`}>
      <Button
        icon
        children={isSidebarOpen ? 'menu' : 'keyboard_arrow_left'}
        onClick={() => { handleToggleSidebar(!isSidebarOpen); }}
        className="topnav_toggle"
      />
      <Button
        flat
        secondary
        onClick={onLogout}
        children="Logout"
        iconEl={<i className="wtfr wtf-sign-out" />}
        className="topnav_logout iBttn iBttn-second-prio"
      />
    </div>
  );
}

function Sidebar(props) {
  const {
    className, menu, history, location,
  } = props;
  return (
    <div className={`${className} sidebar`}>
      <div className="sidebar_logo">
        <img className="logo" src="/img/admin-logo.png" />
        <img className="logoSm" src="/img/logo.png" />
      </div>
      <List className="sidebar_list">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.route;
          return (
            <ListItem
              onClick={() => { history.push(item.route); }}
              className={cn('sidebar_list_item', { active: isActive })}
              leftIcon={<FontIcon>{item.icon}</FontIcon>}
              primaryText={item.label}
            />
          );
        })}
      </List>
    </div>
  );
}

export default AdminPortal;
