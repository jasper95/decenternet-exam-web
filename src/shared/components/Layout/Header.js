import React, {
  useState,
} from 'react';
import Link from 'react-router-dom/Link';
import ImageLoader from 'react-image';
import Button from 'react-md/lib/Buttons/Button';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import { useDispatch } from 'react-redux';
import { useUpdateNode } from 'shared/hooks/useMutation';
import Navigation from 'shared/components/Navigation';
import ReactResizeDetector from 'react-resize-detector';
import { showDialog } from 'shared/redux/app/reducer';
import cn from 'classnames';
import 'sass/components/nav/index.scss';
import loadable from '@loadable/component';
import useRouter from 'shared/hooks/useRouter';
import history from 'shared/utils/history';
import { useRouteMatch } from 'react-router';

const UserDialog = loadable(() => import('pages/Admin/User/components/UserDialog'));

function Header(props) {
  const {
    auth,
    onLogout,
  } = props;

  const router = useRouter();
  const { match } = router;
  const dispatch = useDispatch();
  const user = null;
  const [showMobileNav, onShowMobileNav] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [, onUpdateUser] = useUpdateNode({ node: 'user', message: 'Profile successfully updated' });

  const handleResize = (width, height) => {
    setIsMobileNav(width < 1300);
    onShowMobileNav(false);
  };

  return (
    <ReactResizeDetector
      handleWidth
      handleHeight
      onResize={handleResize}
    >
      {({ width, height }) => (
        <nav className={cn('nav', { 'nav-isMobile': isMobileNav })}>
          <div className="nav_container container">
            <Link to="/" className="nav_logo">
              CENVI
            </Link>
            { isMobileNav ? (
              <>
                <Button
                  icon
                  className="nav_mobile_burger"
                  children={showMobileNav ? 'close' : 'menu'}
                  onClick={() => onShowMobileNav(!showMobileNav)}
                />
                <div className={cn('nav_mobile_container', { 'nav_mobile_container-show': showMobileNav })}>
                  <div className="nav_actions">
                    {renderProfileNav({ isMobile: true })}
                  </div>
                  <Navigation user={user} currentPath={match.path} />
                </div>
              </>
            ) : (
              <>
                <Navigation user={user} currentPath={match.path} />
                <div className="nav_actions">
                  {renderProfileNav()}
                </div>
              </>
            )}

          </div>
        </nav>
      )}
    </ReactResizeDetector>

  );

  function renderProfileNav(props = {}) {
    const {
      isMobile = false,
    } = props;

    if (auth.user) {
      // if (false) {
      //   return (<UserSkeleton />);
      // }
      return (
        <div className="nav_profile">
          <MenuButton
            id="nav_profile_avatar"
            className="nav_profile_avatar"
            menuItems={[
              {
                primaryText: 'Go to Admin',
                leftIcon: <i className="wtfr wtf-user-edit" />,
                onClick: () => history.push('/admin'),
              },
              {
                primaryText: 'Logout',
                onClick: onLogout,
                leftIcon: <i className="wtfr wtf-sign-out" />,
              },
            ]}
            anchor={{
              x: MenuButton.HorizontalAnchors.INNER_LEFT,
              y: MenuButton.VerticalAnchors.BOTTOM,
            }}
          >
            <>
              {!isMobile && (
                <span className="name">
                  USER
                </span>
              )}
              <div className="avatar">
                <ImageLoader src="/img/default-avatar.png" />
              </div>
              {isMobile && (
                <span className="name">
                  USER
                </span>
              )}
            </>
          </MenuButton>
        </div>
      );
    }
    return (
      <>
        <Button
          flat
          onClick={() => { history.push('/login'); }}
          children="Login"
          iconEl={<i className="wtfr wtf-sign-out" />}
          className="iBttn iBttn-primary"
        />
        <Button
          flat
          onClick={() => history.push('/register')}
          children="Register"
          iconEl={<i className="wtfr wtf-user-plus" />}
          className="iBttn iBttn-primary"
        />
      </>
    );
  }


  function editProfile() {
    dispatch(showDialog({
      component: UserDialog,
      props: {
        title: 'Edit Profile',
        initialFields: user,
        onValid: data => onUpdateUser({ data }),
      },
    }));
  }
}

export default Header;
