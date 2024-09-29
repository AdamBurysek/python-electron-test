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
        'w-40 rounded-xl bg-cyan-400 py-2 font-semibold text-black hover:bg-cyan-300',
        className
      )}
    >
      {label}
    </button>
  )
}

export default Button
