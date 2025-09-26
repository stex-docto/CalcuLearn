interface TowerBlockProps {
  blockIndex: number // 0-9 for the 10 blocks in a tower level
  width?: number
  height?: number
  className?: string
}

// Coordinate and size presets for each block piece (fine-tune these values)
const BLOCK_CONFIGS = [
  // Block 1 (l1.PNG) - Foundation
  { x: 0, y: -20, width: 80, height: 40, scale: 2.5 },
  // Block 2 (l2.PNG)
  { x: 5, y: -40, width: 75, height: 35, scale: 1.6 },
  // Block 3 (l3.PNG)
  { x: -1.5, y: -34.5, width: 70, height: 35, scale: 1.15 },
  // Block 4 (l4.PNG)
  { x: 6.5, y: -71, width: 68, height: 32, scale: 3.05 },
  // Block 5 (l5.PNG)
  { x: 9, y: -37, width: 65, height: 30, scale: 1.2 },
  // Block 6 (l6.PNG)
  { x: 14.5, y: -38, width: 62, height: 30, scale: 1.5 },
  // Block 7 (l7.PNG)
  { x: 12, y: -10, width: 60, height: 28, scale: 1.67 },
  // Block 8 (l8.PNG)
  { x: 6, y: -35, width: 58, height: 28, scale: 2.8 },
  // Block 9 (l9.PNG)
  { x: 24, y: -22, width: 55, height: 25, scale: 1.72 },
  // Block 10 (l10.PNG) - Top piece
  { x: 0, y: 0, width: 50, height: 25, scale: 2.0 },
]

export default function TowerBlock({
  blockIndex,
  className = '',
}: TowerBlockProps) {
  // Ensure blockIndex is within valid range (0-9)
  const validIndex = Math.max(0, Math.min(9, blockIndex))
  const imageNumber = validIndex + 1 // Convert 0-9 to 1-10 for filenames
  const config = BLOCK_CONFIGS[validIndex]

  const baseUrl = import.meta.env.BASE_URL || '/'
  const imageUrl = `${baseUrl}l${imageNumber}.PNG`

  // Use config values if provided, otherwise use props
  const blockWidth = config.width
  const blockHeight = config.height

  return (
    <img
      src={imageUrl}
      alt={`Tower block ${imageNumber}`}
      width={blockWidth}
      height={blockHeight}
      className={className}
      style={{
        objectFit: 'contain',
        display: 'block',
        transform: `translate(${config.x}px, ${config.y}px) scale(${config.scale}, ${config.scale})`,
        transformOrigin: 'center center',
      }}
    />
  )
}
