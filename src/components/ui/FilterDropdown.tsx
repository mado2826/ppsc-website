import { ChangeEvent } from 'react'

interface FilterOption {
  value: string
  label: string
}

interface FilterDropdownProps {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  multiple?: boolean
  className?: string
}

export const FilterDropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  multiple = false,
  className = '',
}: FilterDropdownProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

