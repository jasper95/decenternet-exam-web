import React from 'react';
import { ResponsiveContainer } from 'recharts';
import cn from 'classnames';
import 'sass/components/charts/index.scss';

function CustomResponsiveChart(props) {
  const {
    type,
    children,
    chartClassName = ''
  } = props

  return (
    <div className={cn(`${chartClassName} customChart`,{
      [`customChart-${type}`] : type,
    })}>
      <ResponsiveContainer debounce={500}>
        {children}
      </ResponsiveContainer>
    </div>
	)
}

export default CustomResponsiveChart