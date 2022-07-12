import React from 'react'
import { Box } from '@mui/material'
import { createSx } from '~/conductors/hooks'
import { ratioToPercentStr } from '~/conductors/utils'

type ImageProps = {
  src: string
  alt: string
  width?: string
  height?: string
  aspectRatio?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  blockDownload?: boolean
}

const useSx = createSx<ImageProps>((props) => {
  const { width, height, aspectRatio, fit, blockDownload } = props
  return {
    root: {
      display: 'inline-block',
      position: 'relative',
      width,
      height,
      lineHeight: 0
    },
    ratio: {
      width: '100%',
      height: aspectRatio ? 0 : height,
      paddingBottom: aspectRatio ? ratioToPercentStr(aspectRatio) : 0,
      opacity: 0
    },
    image: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: fit
    },
    blocker: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: !blockDownload ? -1 : 'auto'
    }
  }
})

const Image: React.VFC<ImageProps> = (props) => {
  const {
    src,
    alt,
    width = '100%', // ex: 100%, 80px, etc
    height = 'auto', // ex: 100%, 80px, auto, etc
    aspectRatio = '', // ex: 16:9, 4:3, etc
    fit = 'fill', // fill, contain, cover, none, scale-down
    blockDownload = false // whether div covers img tag or not.
  } = props
  const sx = useSx({ src, alt, width, height, aspectRatio, fit, blockDownload })

  return (
    <Box sx={sx.root}>
      {/* image aspect ratio sizer */}
      <Box component="img" sx={sx.ratio} src={src} alt={alt} crossOrigin="anonymous" />
      {/* image render */}
      <Box component="img" sx={sx.image} src={src} alt={alt} crossOrigin="anonymous" />
      {/* image download blocker */}
      <Box sx={sx.blocker} />
    </Box>
  )
}

export { Image }