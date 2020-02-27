import React from 'react'

const Button = ({value, isSubmitting}) => {
  return (
    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Loading ...' : value}
    </button>
  )
}

export default Button
