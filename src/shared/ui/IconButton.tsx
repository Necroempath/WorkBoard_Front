type Props = {
  onClick: () => void
  variant?: 'blue' | 'gray'
}

export const IconButton = ({ onClick, variant = 'blue' }: Props) => {
  const base =
    'w-8 h-8 flex items-center justify-center rounded-full text-white transition hover:scale-105 active:scale-95'

  const styles =
    variant === 'blue'
      ? 'bg-blue-500 hover:bg-blue-600'
      : 'bg-gray-400 hover:bg-gray-500'

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      <span className="text-xl font-bold leading-none -translate-y-[1px]">
        +
       </span>
    </button>
  )
}
