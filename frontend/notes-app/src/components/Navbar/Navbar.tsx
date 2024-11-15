import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = ({searchQuery, setSearchQuery}:any) => {

  function clearSearch() {
    setSearchQuery("")
  }

  return (
    <div className='items-center w-full flex justify-between px-10 py-4 border-b '>
      <span>Notes App</span>
      <SearchBar value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} onClearSearch={clearSearch} />
    </div>
  )
}

export default Navbar