// functiopn to check availlibility of rooms

import Booking from "../models/Booking.js"
import Room from "../models/Rooms.js"
const checkAvailability = async ({checkInDate , checkOutDate , room}) => {
    try{
        const bookings = await Booking.find({
            room,
            checkInDate:{$lte:checkOutDate},
            checkOutDate:{$gte:checkInDate},
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    }
    catch(error){
        console.error(error.message);
    }
}

// API to check avalability of room
// POST /api/booking/check-availability

export const checkAvailabilityAPI = async (req,res) => {
    try {
        const {room ,checkInDate,checkOutDate} = req.body;
        const isAvailable = await checkAvailability({checkInDate,checkOutDate,room});
        res.json({success:true,isAvailable})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//API TO CREATE A NEW BOOKING 
// PORT /API/VOOKING /BOOK

export const createBooking = async (req,res) => {
    try {
        const {room , checkInDate,checkOutDate,guests} = req.body;
        const user = req.user._id;

        //Before Booking Check Availability
        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room
        });

        if(!isAvailable){
            return res.json({success:false,message:"Room is not avalilable"})
        }

        //Gt totalPrice fro mRoom 
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        //calculate totalPrice basaed on nughts
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff/(1000*3600*24));

        totalPrice*=nights;

        const booking = await Booking.create({
            user,
            room,
            hotel:roomData.hotel._id,
            guests:+guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })

        res.json({success:true,message:"Booking create succesfully"})

    } catch (error) {
        
        res.json({success:false,message:"Failt to  create booking"})

    }
}

// APi to get all booking for a yser

export const getUserBookings = async (req,res)=>{
    try{
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").sort({createsAt:-1})
        res.json({success:true,bookings})
    }
    catch(error){
        res.json({success:false,message:"Fails o fetch bookings"});
    }
}

export const getHotelBookings = async(req,res)=>{
    try {
        const hotel = await Hotel.findOne({owner:req.auth.userId});
    if(!hotel){
        return res.json({success:false,message:"No Hotel found"});
    }
    const bookings = await Booking.find({hotel:hotel._id}).populate("room hotel user").sort({createdAt:-1});

    //toal booking 
    const totalBookings = bookings.length;
    //total revenue
    const totalRevenue = bookings.reduce((acc,booking) => acc + booking.totalPrice , 0)

    res.json({success:true,dashboardData:{totalBookings ,totalRevenue,bookings}})

    } catch (error) {
        res.json({success:false , message:"Failed to fetch bookings"})
    }
}