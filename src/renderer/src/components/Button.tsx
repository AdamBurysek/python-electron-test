import { cn } from '@renderer/lib/utils'

interface Props {
  onClick: () => void
  label: string
  className?: string
}

const Button = ({ onClick, label, className }: Props): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-cyan-400 rounded-xl w-40 py-2 text-black font-semibold hover:bg-cyan-300',
        className
      )}
    >
      {label}
    </button>
  )
}

export default Button
