
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { useState } from 'react'

import Button from '~/components/Button'
import { default as PopperWrapper } from '~/components/Popper/Wrapper'
import {default as MenuHeader} from './MenuHeader'
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

const dfFunction = () => {}

function Menu({ children, hideOnClick= false, items = [], onChange = dfFunction()  }) {
  const [history, setHistory] = useState([{ data: items }])
  const current = history[history.length - 1]

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children
      const classes = cx('menu-item', {
          topBorder : item.topBorder
      })


      return (
        <div
          key={index}
          className={classes}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children])
            } else {
              onChange(item)
            }
          }}
        >
          <Button leftIcon={item.icon} className={cx('menu-item-btn')}>
            {item.title}
          </Button>
        </div>
      )
    })
  }

  // const 

  return (
    <Tippy

      delay={[0, 500]}
      interactive
      hideOnClick= {hideOnClick}
      offset={[12,10]}
      placement="bottom-end"
      onHide={() => { setHistory(pre => pre.slice(0, 1)) }}
      render={(attrs) => (
        <div className={cx('menu-list')} tabIndex={-1} {...attrs}>
          <PopperWrapper className={cx('menu-popper')}>

            {/*  */}
            {history.length > 1 && (
              <MenuHeader
                onClick={() => {
                  setHistory((prev) => prev.slice(0, prev.length - 1))
                }}
                title={current.title}
              ></MenuHeader>
            )}

                {/*  */}
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  )
}

Menu.propType = {
  children: PropTypes.node,
  hideOnClick: PropTypes.bool,
  items: PropTypes.array,
  onChange: PropTypes.func

  
}

export default Menu
