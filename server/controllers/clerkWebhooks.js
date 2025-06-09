import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    console.log("hii clerk");
    
    // GETTING HEADERS
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    await whook.verify(JSON.stringify(req.body),headers)

    //getting data from request body
    const {data,type} =req.body

    const userData = {
        _id : data.id,
        email:data.email_addresses[0].email_address,
        username:data.first_name + " "+ data.last_name,
        image:data.image_url,
    }

    // 

     switch (type) {
      case 'user.created': {
        await User.create(userData);
        console.log("user created");
        
        break;
      }

      case 'user.updated': {
        await User.findByIdAndUpdate(data.id, userData)
        break
      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        console.log('Unhandled event type:', type)
    }
    res.json({success:true,message:"WEBHOOK RECEIVED"})
  } catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message})
  }
};

export default clerkWebhooks;
