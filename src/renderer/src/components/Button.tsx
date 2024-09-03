interface Props {
  onClick: () => void
  label: string
}

const Button = ({ onClick, label }: Props): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="bg-cyan-400 rounded-xl w-40 py-2 text-black font-semibold hover:bg-cyan-300"
    >
      {label}
    </button>
  )
}

export default Button
