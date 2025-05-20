import React, { useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const CheckBox = ({ label, selected=false, onChange=()=>{ }}) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input type="checkbox" checked={selected} onChange={(e)=>onChange(e.target.checked,label)} />
      <span className='font-light select-none'>{label}</span>
    </label>
  )
}

const RadioButton = ({ label, selected=false, onChange=()=>{ }}) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input type="radio" name='sortOption' checked={selected} onChange={()=>onChange(label)} />
      <span className='font-light select-none'>{label}</span>
    </label>
  )
}

const AllRooms = () => {

  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  const roomTypes = [
    "Single Bed",
    "Double Bed",
    "Luxury Room",
    "Family Suite"
  ];

  const pricesRanges = [
    'o to 500',
    '500 to 1000',
    '1000 to 2000',
    '2000 to 3000',
  ]

  const sortOptions = [
    "Prices Low to High",
    "Prices High to Low",
    "Newest First"
  ]

  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div>
        <div className='flex flex-col items-start text-left'>
          <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
          <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Dreaming of a relaxing escape or a quick city break? Now’s the time to turn those dreams into reality! Our exclusive hotel room offers give you the comfort, convenience, and luxury you deserve — all at unbeatable prices.</p>
        </div>

        {roomsDummyData.map((room) => (
          <div className='flex flex-col md:flex-row items-start gap-6 py-10 border-b border-gray-300 last:pb-30 last:border-0' key={room._id}>
            <img onClick={()=> {navigate(`/rooms/${room._id}`); scrollTo(0,0)}} src={room.images[0]} alt="hotel_img" title='View Rooms Detials' className='max-h-75 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer' />
            <div className='md:w-1/2 flex flex-col gap-2'>
              <p className='text-gray-500'>{room.hotel.city}</p>
              <p onClick={()=> {navigate(`/rooms/${room._id}`); scrollTo(0,0)}} className='text-gray-800 text-3xl font-playfair cursor-pointer '>{room.hotel.name}</p>
              <div className='flex items-center'>
                <StarRating/>
                <p className='ml-2'>200+ reviewa</p>
              </div>

              <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                <img src={assets.locationIcon} alt="locationIcon" />
                <span>{room.hotel.address}</span>
              </div>

              {/* Rooms Amenties */}
              <div className='flex flex-wrap items-center gap-4 mt-4 mb-6'>
                {room.amenities.map((item, index) => (
                  <div key={index} className='flex items-center gap-2 bg-gray-300 rounded-lg px-3 py-2'>
                    <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                    <p className='text-xs'>{item}</p>
                  </div>
                ))}
              </div>

              {/* rooms prices per night */}

              <p className='text-xl font-medium text-gray-700'>${room.pricePerNight} /night</p>
            </div>
          </div>
        ))}
      </div>

      {/* filter */}
      <div className='bg-white w-80 border border-gray-600 text-gray-600 max-lg:mb-8 min-lg:mt-16'>

        <div className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${openFilters && "border-b"}`}>
          <p className='text-base font-medium text-gray-800'>FILTERS</p>
          <div className='text-xs cursor-pointer'>
            <span onClick={()=>setOpenFilters(!openFilters)} className='lg:hidden'>{openFilters ? 'HIDE':'SHOW'}</span> 
            <span className='hidden lg:block'>CLEAR</span>
          </div>
        </div>

        <div className={`${openFilters ? 'h-auto':'h-0 lg:h-auto'} overflow-hidden transition-all duration-700 ease-in-out`}>
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Popular filters</p>

            {
              roomTypes.map((room, index) => (
                <CheckBox key={index} label={room} selected={false} onChange={()=>{}}/>
              ))
            }
          </div>

          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Price Range</p>

            {
              pricesRanges.map((range, index) => (
                <CheckBox key={index} label={ `${range}`} selected={false} onChange={()=>{}}/>
              ))
            }
          </div>

          <div className='px-5 pt-5 pb-7'>
            <p className='font-medium text-gray-800 pb-2'>Sort By</p>

            {
              sortOptions.map((option, index) => (
                <RadioButton key={index} label={ `${option}`} selected={false} onChange={()=>{}}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllRooms
