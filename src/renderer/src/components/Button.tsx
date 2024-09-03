interface Props {
  onClick: () => void
  label: string
}

const Button = ({ onClick, label }: Props): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="bg-cyan-700 rounded-xl px-4 py-2 text-white font-semibold hover:bg-cyan-600"
    >
      {label}
    </button>
  )
}

export default Button
