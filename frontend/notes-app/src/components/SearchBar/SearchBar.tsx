import React from 'react'
import { Input } from '../ui/input'
import { Search, X } from 'lucide-react'

const SearchBar = ({value, onChange, onSearch, onClearSearch} : any) => {
  return (
    <div className='w-80 rounded-md flex items-center px-4 bg-slate-100'>
      <Input type='text' placeholder='Search Notes' value={value} onChange={onChange} className='w-full text-xs bg-transparent py-[11px] outline-none' />
      {value && <X onClick={onClearSearch} className='text-xl hover:text-black cursor-pointer' />}
    </div>
  )
}

export default SearchBar