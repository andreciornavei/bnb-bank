import { useEffect, useState, useRef } from 'react'

export const useScrollInfo = (pageBottomLimit = 0) => {
  const [scrollInfo, setScrollInfo] = useState({
    isPageTop: false,
    isPageBottom: false,
    isScrolledUp: false,
    isScrolledDown: false,
    scrolledPosition: window.pageYOffset,
    documentHeight: document.documentElement.offsetHeight,
  })

  const lastScrollInfo = useRef(scrollInfo)

  const handleScroll = () => {
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    )
    const scrolledPosition = Math.ceil(window.pageYOffset)
    const isPageBottom =
      window.innerHeight + scrolledPosition >= documentHeight - pageBottomLimit
    const isPageTop = window.pageYOffset === 0
    const isScrolledUp =
      scrolledPosition < lastScrollInfo.current.scrolledPosition
    const isScrolledDown =
      scrolledPosition > lastScrollInfo.current.scrolledPosition
    const scrollInfo = {
      isPageTop,
      isPageBottom,
      isScrolledUp,
      isScrolledDown,
      scrolledPosition,
      documentHeight,
    }
    setScrollInfo(scrollInfo)
    lastScrollInfo.current = scrollInfo
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return scrollInfo
}
