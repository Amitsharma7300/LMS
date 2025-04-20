import Stripe from "stripe";
import { Webhook } from "svix";
import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + "" + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData); // Save the user data to MongoDB
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + "" + data.last_name,
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        console.log("Unhandled Event Type:", type);
        res.json({});
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const stripeInstance=new Stripe(process.env.STRIPE_SECRET_KEY)
export const StripeWebhooks=async(req,res)=>{
    const sig = request.headers['stripe-signature'];
let event;
try {

event = stripe.webhooks.constructEvent(request.body, sig, process.emv.STRIPE_WEBHOOK_SECRET);

}

catch (err) {
response.status (400).send('WebhookError: ${err.message}');
}


switch (event.type) {
    case 'payment_intent.succeeded':{
      const paymentIntent = event.data.object;
    const paymentIntentId=paymentIntent.id
const session=await  stripeInstance.checkout.sessions.list({
    payment_intent:paymentIntentId
})
 const {purchaseId}=session.data[0].metadata;
 const purchaseData=await Purchase.findById(purchaseId)
 const userData=await User.findById(purchaseData.userId)
 const courseData=await Course.findById(purchaseData.courseId.toString())

 courseData.enrolledStudents.push(userData)

 await courseData.save()

 userData.enrolledCourses.push(courseData._id)
 await userData.save()

 purchaseData.status="completed"
 await purchaseData.save()
      break;}


    case 'payment_intent.payment_failed':
    {
        const paymentIntent = event.data.object;
        const paymentIntentId=paymentIntent.id
    const session=await  stripeInstance.checkout.sessions.list({
        payment_intent:paymentIntentId
    })
     const {purchaseId}=session.data[0].metadata;
     const purchaseData=await Purchase.findById(purchaseId)
     purchaseData.status='failed'
     await purchaseData.save()
     break;
    }
    
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true });
}

``