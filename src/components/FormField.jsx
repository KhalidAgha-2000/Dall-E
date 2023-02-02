
const FormField = ({ labelName, type, placeholder, name, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className="flex items-center pl-2 gap-2 mb-2">
        <label htmlFor={name}
          className='block font-medium text-sm text-gray-900'
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type='button' onClick={handleSurpriseMe}
            className='font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-md text-black'>
            Surprise Me
          </button>
        )}

      </div>

      <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handleChange} required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
      />
    </div>
  )
}
export default FormField